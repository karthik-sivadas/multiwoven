import {
  Box,
  Button,
  Flex,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { FiPlus } from 'react-icons/fi';
import {
  Formik,
  Form,
  ErrorMessage,
  FieldInputProps,
  FormikTouched,
  FormikErrors,
  FormikProps,
} from 'formik';
import * as Yup from 'yup';
import { inviteUser } from '@/enterprise/services/settings';
import { InviteUserPayload } from '@/enterprise/services/types';
import { WorkspaceAPIResponse } from '@/services/settings';
import { useStore } from '@/stores';
import { useMutation } from '@tanstack/react-query';
import { useRef, useState } from 'react';
import useCustomToast from '@/hooks/useCustomToast';
import { CustomToastStatus } from '@/components/Toast';

type FormFieldProps = {
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
};

const FormField = ({ name, type, getFieldProps, touched, errors, placeholder }: FormFieldProps) => (
  <FormControl isInvalid={!!(touched[name] && errors[name])}>
    <Input
      variant='outline'
      placeholder={placeholder}
      _placeholder={{ color: 'black.100' }}
      type={type}
      fontSize='sm'
      color='black.500'
      focusBorderColor='brand.400'
      _hover={{ borderColor: 'gray.400' }}
      {...getFieldProps(name)}
    />
    <Text size='xs' color='red.500' mt={2}>
      <ErrorMessage name={name} />
    </Text>
  </FormControl>
);

const inviteMemberSchema = Yup.object().shape({
  email: Yup.string().email('Please enter a valid email address').required('Email is required'),
  role_id: Yup.string().oneOf(['1', '2', '3'], 'Invalid Role').required('Role is required'),
});

export const InviteMemberPopup = ({
  workspaceData,
  handleRefetch,
}: {
  workspaceData: WorkspaceAPIResponse;
  handleRefetch: () => void;
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [submitting, setSubmitting] = useState(false);
  const showToast = useCustomToast();

  const activeWorkspaceId = useStore((state) => state.workspaceId);

  const formikRef = useRef<FormikProps<{ email: string; role_id: string }> | null>(null);
  const handleModalOpen = () => {
    onOpen();
    formikRef.current?.resetForm();
  };

  const { mutateAsync } = useMutation({
    mutationFn: (values: InviteUserPayload) => inviteUser(activeWorkspaceId, values),
    mutationKey: ['invite-user'],
  });

  const handleSubmit = async (values: { email: string; role_id: string }) => {
    setSubmitting(true);
    const inviteUserPayload: InviteUserPayload = {
      user: {
        email: values.email,
        role_id: values.role_id,
      },
    };
    const result = await mutateAsync(inviteUserPayload);

    if (result?.data?.attributes.status === 'invited') {
      showToast({
        duration: 3000,
        isClosable: true,
        position: 'bottom-right',
        title: 'Invited user successfully',
        status: CustomToastStatus.Success,
      });
      handleRefetch();
      onClose();
      setSubmitting(false);
    }
    if (result?.errors) {
      result.errors.forEach((error) => {
        showToast({
          duration: 3000,
          isClosable: true,
          position: 'bottom-right',
          title: error.source,
          status: CustomToastStatus.Error,
        });
      });
      setSubmitting(false);
    }
    setSubmitting(false);
  };

  const activeWorkspaceDetails = workspaceData?.data.find(
    (workspace) => workspace?.id === activeWorkspaceId,
  );

  return (
    <>
      <Button
        variant='solid'
        size='md'
        leftIcon={<FiPlus />}
        width='fit-content'
        onClick={handleModalOpen}
      >
        Invite Member
      </Button>
      <Formik
        initialValues={{
          email: '',
          role_id: '',
        }}
        onSubmit={handleSubmit}
        validationSchema={inviteMemberSchema}
        innerRef={formikRef}
      >
        {({ getFieldProps, touched, errors }) => (
          <Form>
            <Modal isOpen={isOpen} onClose={onClose} size='xl' isCentered>
              <ModalOverlay bg='blackAlpha.400' />
              <ModalContent>
                <ModalHeader>
                  <Text size='md' fontWeight='bold'>
                    Invite teammate to {activeWorkspaceDetails?.attributes.organization_name}
                  </Text>
                </ModalHeader>
                <ModalCloseButton color='gray.600' />
                <Form>
                  <ModalBody mx='auto' w='full'>
                    <Flex direction='column' gap='24px'>
                      <Box display='flex' flexDir='column' gap='8px'>
                        <Text size='sm' fontWeight='semibold'>
                          Email
                        </Text>
                        <FormField
                          placeholder='Enter email'
                          name='email'
                          type='text'
                          getFieldProps={getFieldProps}
                          touched={touched}
                          errors={errors}
                        />
                      </Box>
                      <Box display='flex' flexDir='column' gap='8px'>
                        <Text size='sm' fontWeight='semibold'>
                          Invite as
                        </Text>
                        <FormControl isInvalid={!!(touched.role_id && errors.role_id)}>
                          <Select
                            placeholder='Select role'
                            focusBorderColor='brand.400'
                            {...getFieldProps('role_id')}
                          >
                            <option value='1'>Admin</option>
                            <option value='2'>Member</option>
                            <option value='3'>Viewer</option>
                          </Select>
                          <Text size='xs' color='red.500' mt={2}>
                            <ErrorMessage name='role_id' />
                          </Text>
                        </FormControl>
                      </Box>
                    </Flex>
                  </ModalBody>

                  <ModalFooter pt={8} pb={8}>
                    <Box w='full'>
                      <Flex flexDir='row' justifyContent='end'>
                        <Button
                          variant='ghost'
                          mr={3}
                          onClick={onClose}
                          size='md'
                          color='black.500'
                          w='fit-content'
                        >
                          Cancel
                        </Button>
                        <Button
                          variant='solid'
                          color='white'
                          rounded='lg'
                          size='md'
                          type='submit'
                          isLoading={submitting}
                        >
                          Send Invitation
                        </Button>
                      </Flex>
                    </Box>
                  </ModalFooter>
                </Form>
              </ModalContent>
            </Modal>
          </Form>
        )}
      </Formik>
    </>
  );
};
