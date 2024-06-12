import { useState } from 'react';
import { Formik, Form, ErrorMessage, FormikTouched, FormikErrors, FieldInputProps } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  Input,
  Heading,
  Text,
  Container,
  Stack,
  Flex,
  HStack,
  Image,
} from '@chakra-ui/react';
import MultiwovenIcon from '@/assets/images/icon-white.svg';
import { SignUpPayload, signUp, AuthErrorResponse } from '@/services/authentication';
import Cookies from 'js-cookie';
import titleCase from '@/utils/TitleCase';
import AuthFooter from '../AuthFooter';
import HiddenInput from '@/components/HiddenInput';
import { CustomToastStatus } from '@/components/Toast/index';
import useCustomToast from '@/hooks/useCustomToast';
import { useMutation } from '@tanstack/react-query';
import { Mixpanel } from '@/mixpanel';
import { EVENTS } from '@/events-constants';
import { useConfigStore } from '@/enterprise/store/useConfigStore';
import { inviteSignUp, InviteSignUpPayload } from '@/enterprise/services/authentication';

const SignUpSchema = Yup.object().shape({
  company_name: Yup.string().required('Company name is required'),
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .max(128, 'Password cannot be more than 128 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/\d/, 'Password must contain at least one digit')
    .matches(/[@$!%*?&]/, 'Password must contain at least one special character')
    .required('Password is required'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm Password is required'),
});

interface SignUpFormProps {
  name: string;
  type: string;
  placeholder?: string;
  getFieldProps: (
    nameOrOptions:
      | string
      | {
          name: string;
          value?: any;
          onChange?: (e: any) => void;
          onBlur?: (e: any) => void;
        },
  ) => FieldInputProps<any>;
  touched: FormikTouched<any>;
  errors: FormikErrors<any>;
  isInviteFlow?: boolean;
  helperText?: string;
}

const FormField = ({
  name,
  type,
  getFieldProps,
  touched,
  errors,
  placeholder,
  isInviteFlow = false,
}: SignUpFormProps) => (
  <FormControl isInvalid={!!(touched[name] && errors[name])}>
    <Input
      variant='outline'
      placeholder={placeholder}
      _placeholder={{ color: 'black.100' }}
      type={type}
      {...getFieldProps(name)}
      fontSize='sm'
      color='black.500'
      focusBorderColor='brand.400'
      disabled={isInviteFlow}
      borderColor={isInviteFlow ? 'gray.500' : 'gray.400'}
      backgroundColor={isInviteFlow ? 'gray.300' : 'gray.100'}
    />
    <Text size='xs' color='red.500' mt={2}>
      <ErrorMessage name={name} />
    </Text>
  </FormControl>
);

const PasswordField = ({
  name,
  type,
  getFieldProps,
  touched,
  errors,
  placeholder,
  helperText,
}: SignUpFormProps) => (
  <FormControl isInvalid={!!(touched[name] && errors[name])}>
    <HiddenInput
      variant='outline'
      placeholder={placeholder}
      _placeholder={{ color: 'black.100' }}
      type={type}
      {...getFieldProps(name)}
      fontSize='sm'
      color='black.500'
      focusBorderColor='brand.400'
    />
    <Text color='gray.600' ml={1} mt={2} fontWeight={400} size='xs'>
      {helperText}
    </Text>
    <Text size='xs' color='red.500' mt={2} ml={1}>
      <ErrorMessage name={name} />
    </Text>
  </FormControl>
);

const SignUp = (): JSX.Element => {
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const showToast = useCustomToast();
  const [searchParams] = useSearchParams();

  // invite sign up flow params
  let isInviteSignupFlow = false;
  const workspaceName = searchParams.get('workspace_name');
  const invitationToken = searchParams.get('invitation_token');
  const invitedBy = searchParams.get('invited_by');
  const invitedUserEmail = searchParams.get('invited_user');

  if (workspaceName && invitationToken && invitedBy) {
    isInviteSignupFlow = true;
  }

  const { mutateAsync } = useMutation({
    mutationFn: (values: SignUpPayload) => signUp(values),
    mutationKey: ['signIn'],
  });

  const { mutateAsync: inviteSignupMutateAsync } = useMutation({
    mutationFn: (values: InviteSignUpPayload) => inviteSignUp(values),
    mutationKey: ['signIn'],
  });

  const handleSubmit = async (values: any) => {
    setSubmitting(true);
    try {
      const payload = { user: { ...values, invitation_token: invitationToken } };
      const result = isInviteSignupFlow
        ? await inviteSignupMutateAsync(payload)
        : await mutateAsync(values);

      if (result.data?.attributes) {
        const token = result.data.attributes.token;
        if (token) {
          Cookies.set('authToken', token, {
            secure: true,
            sameSite: 'Lax',
          });

          showToast({
            title: 'Account created.',
            status: CustomToastStatus.Success,
            duration: 3000,
            isClosable: true,
            position: 'bottom-right',
          });
          Mixpanel.track(EVENTS.SIGNUP_SUCCESS, {
            company_name: values.company_name,
            name: values.name,
            email: values.email,
          });

          navigate('/');
        } else {
          showToast({
            duration: 5000,
            isClosable: true,
            position: 'bottom-right',
            colorScheme: 'red',
            status: CustomToastStatus.Warning,
            title: titleCase('Auth token is invalid'),
          });
        }
      } else {
        result.errors?.forEach((error: AuthErrorResponse) => {
          showToast({
            duration: 5000,
            isClosable: true,
            position: 'bottom-right',
            colorScheme: 'red',
            status: CustomToastStatus.Warning,
            title: titleCase(error.detail),
          });
        });
      }
    } catch (error) {
      showToast({
        title: 'An error occured. Please try again later.',
        status: CustomToastStatus.Error,
        duration: 5000,
        isClosable: true,
        position: 'bottom-right',
        colorScheme: 'red',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const { logoUrl, brandName = 'AI Squared' } = useConfigStore.getState().configs;

  return (
    <>
      <Flex justify='center' w='100%' minHeight='90vh' alignItems='center' overflowY='auto'>
        <Formik
          initialValues={{
            company_name: isInviteSignupFlow ? workspaceName : '',
            name: '',
            email: isInviteSignupFlow ? invitedUserEmail : '',
            password: '',
            password_confirmation: '',
          }}
          onSubmit={(values) => handleSubmit(values)}
          validationSchema={SignUpSchema}
        >
          {({ getFieldProps, touched, errors }) => (
            <Form>
              <Container width={{ base: '400px', sm: '500px' }} py='6'>
                <Stack>
                  <Box position='relative' top='12'>
                    <Box
                      bgColor={logoUrl ? 'gray.100' : 'brand.400'}
                      h='80px'
                      w={logoUrl ? '150px' : '80px'}
                      display='flex'
                      justifyContent='center'
                      alignItems='center'
                      borderRadius='11px'
                      mx='auto'
                    >
                      <Image
                        src={logoUrl ? logoUrl : MultiwovenIcon}
                        width={logoUrl ? '100%' : '45px'}
                        alt={`${brandName} Logo in White`}
                      />
                    </Box>
                  </Box>
                  <Box
                    padding='20px'
                    borderRadius='10px'
                    border='1px'
                    borderColor='gray.400'
                    paddingTop='60px'
                  >
                    <Stack spacing='8px' textAlign='center' mb='32px'>
                      <Heading size='xs' fontWeight='semibold'>
                        {isInviteSignupFlow
                          ? "Let's activate your data"
                          : `Get started with ${brandName}`}
                      </Heading>
                      {isInviteSignupFlow ? (
                        <Text size='sm' color='black.200'>
                          <Text as='span' fontWeight='bold'>
                            {invitedBy}{' '}
                          </Text>
                          {`has invited you to use ${brandName} with them, in a workspace called `}
                          <Text as='span' fontWeight='bold'>
                            {workspaceName}
                          </Text>
                        </Text>
                      ) : (
                        <Text size='sm' color='black.200'></Text>
                      )}
                    </Stack>
                    <Stack spacing='20px'>
                      <Stack spacing='16px'>
                        <FormField
                          placeholder='Enter company name'
                          name='company_name'
                          type='text'
                          getFieldProps={getFieldProps}
                          touched={touched}
                          errors={errors}
                          isInviteFlow={isInviteSignupFlow}
                        />
                        <FormField
                          placeholder='Enter name'
                          name='name'
                          type='text'
                          getFieldProps={getFieldProps}
                          touched={touched}
                          errors={errors}
                        />
                        <FormField
                          placeholder='Enter email'
                          name='email'
                          type='text'
                          getFieldProps={getFieldProps}
                          touched={touched}
                          errors={errors}
                          isInviteFlow={isInviteSignupFlow}
                        />
                        <PasswordField
                          placeholder='Choose password'
                          name='password'
                          type='password'
                          getFieldProps={getFieldProps}
                          touched={touched}
                          errors={errors}
                          helperText='Password must be 8-128 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.'
                        />
                        <PasswordField
                          placeholder='Confirm password'
                          name='password_confirmation'
                          type='password'
                          getFieldProps={getFieldProps}
                          touched={touched}
                          errors={errors}
                        />
                        <HStack spacing={1}>
                          <Text color='black.200' size='xs' fontWeight='regular'>
                            By creating an account, I agree to the{' '}
                          </Text>
                          <Link to='https://multiwoven.com/terms' target='_blank'>
                            <Text color='brand.400' size='xs' fontWeight='medium'>
                              Terms
                            </Text>
                          </Link>
                          <Text color='black.200' size='xs' fontWeight='regular'>
                            and
                          </Text>
                          <Link to='https://multiwoven.com/privacy' target='_blank'>
                            <Text color='brand.400' size='xs' fontWeight='medium'>
                              Privacy Policy
                            </Text>
                          </Link>
                        </HStack>
                      </Stack>
                      <Stack spacing='6'>
                        <Button
                          type='submit'
                          isLoading={submitting}
                          loadingText='Creating Account'
                          variant='solid'
                          width='full'
                        >
                          Create Account
                        </Button>
                        <HStack spacing={1} justify='center'>
                          <Text color='black.500' size='xs' fontWeight='medium'>
                            Do you have an account?{' '}
                          </Text>
                          <Link to='/sign-in'>
                            <Text color='brand.400' size='xs' fontWeight='semibold'>
                              Sign In
                            </Text>
                          </Link>
                        </HStack>
                      </Stack>
                    </Stack>
                  </Box>
                </Stack>
              </Container>
            </Form>
          )}
        </Formik>
      </Flex>
      <AuthFooter />
    </>
  );
};

export default SignUp;
