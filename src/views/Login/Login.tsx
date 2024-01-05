import { Formik, Form } from 'formik';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { Box, Button, FormControl, Input, Image, Heading, Text, Link, Container, Flex, Spacer, Checkbox } from '@chakra-ui/react';
import MultiwovenLogo from '../../assets/images/multiwoven-logo.png';
import AlertPopUp, { alertMessage } from '@/components/Alerts/Alerts';
import { login } from '@/services/login';
import Cookies from 'js-cookie';

const Login = () => {
    let message = alertMessage;
    const [messages, setMessages] = useState({
        show: false,
        alertMessage: message
    });
    const navigate = useNavigate();

    const handleSubmit = async (values: any) => {
        if (values.email.trim() === '' || values.password.trim() === '') {
            message = {
                status: 'error',
                description: ['Invalid email or password']
            };
            setMessages({ show: true, alertMessage: message });
            setTimeout(()=>{
                setMessages({ show: false, alertMessage: message });
            },3000)
            return false;
        }
        const result = await login(values);
        if (result.success) {
            const token = result?.response?.data?.token;
            Cookies.set('authToken', token);
            navigate('/');
        } else {
            message = {
                status: 'error',
                description: [result?.error?.message]
            };
            setMessages({ show: true, alertMessage: message });
        }
    };

    return (

        <Container display='flex' flexDir='column' justifyContent='center' maxW='650' minH='100vh' className='flex flex-col align-center justify-center'>
            <div className='top_side_back'></div>
            <div className='bottom_side_back'></div>
            <Box width='100%' className="flex min-h-full flex-1 flex-col align-center justify-center py-12 sm:px-6 lg:px-8">
                <Box display='flex' justifyContent='center' className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <Image
                        maxW="300px"
                        w="95%"
                        src={MultiwovenLogo}
                        alt="Multiwoven"
                    />
                </Box>
                <Box mt="14" className="sm:mx-auto sm:w-full sm:max-w-[480px]">
                    <Box bg="white" border='1px' borderColor="border" px="24" py="12" rounded="lg" className="sm:px-12">
                        <Heading fontSize='40px' as="h2" mt="0" mb='10' fontWeight="normal" textAlign="center" >
                            Log in to your account
                        </Heading>
                        {messages.show ? <AlertPopUp {...messages.alertMessage} /> : <></>}
                        <Formik
                            initialValues={{ email: '', password: '' }}
                            onSubmit={(values) => handleSubmit(values)}
                        >
                            {({ getFieldProps }) => (
                                <Form>
                                    <FormControl mb='24px' id="email">
                                        <Input variant='outline' placeholder='Email' {...getFieldProps('email')} />
                                    </FormControl>

                                    <FormControl mb='24px' id="password">
                                        <Input type="password" placeholder='Password' {...getFieldProps('password')} />
                                    </FormControl>

                                    <Button type="submit" background="secondary" color='white' width="full" _hover={{ background: "secondary" }}>
                                        Login
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                        <Box width='100%' className="flex min-h-full flex-1 flex-col align-center justify-center py-12 sm:px-6 lg:px-8">
                            <Flex paddingBottom='5' borderBottom='1px' borderColor='border'>
                                <Text mt="4" textAlign="left" fontSize="sm" color="black">
                                    <Checkbox size='md' colorScheme='blue'>
                                        Remember me
                                    </Checkbox>
                                </Text>
                                <Spacer />
                                <Text mt="4" textAlign="right" fontSize="sm" color="gray.500">
                                    <Link fontWeight="500" as={RouterLink} to="/login" color="hyperlink" _hover={{ color: 'hyperlink' }}>
                                        Forgot password
                                    </Link>
                                </Text>
                            </Flex>
                            <Text display='flex' mt="5" textAlign="left" fontSize="sm" color="gray.500">
                                Don't have an account?
                                <Link ml='1' as={RouterLink} to="/sign-up" color="hyperlink" _hover={{ color: 'hyperlink' }}>
                                    Sign Up
                                </Link>
                            </Text>
                        </Box>
                    </Box>
                </Box>
            </Box>

        </Container>

    )
}

export default Login;