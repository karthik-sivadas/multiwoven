import { getUserProfile, logout } from '@/services/user';
import {
  Avatar,
  Box,
  Button,
  HStack,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  VStack,
} from '@chakra-ui/react';
import { CustomToastStatus } from '@/components/Toast/index';
import useCustomToast from '@/hooks/useCustomToast';
import { useQuery } from '@tanstack/react-query';
import { FiLogOut, FiMoreVertical } from 'react-icons/fi';
<<<<<<< HEAD
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { data } = useQuery({
    queryKey: ['users', 'profile', 'me'],
    queryFn: () => getUserProfile(),
    refetchOnMount: true,
    refetchOnWindowFocus: false,
  });
=======
import { userIdStore } from '@/stores/userIdStore';
import { useEffect } from 'react';
import { useStore } from '@/stores';
import useQueryWrapper from '@/hooks/useQueryWrapper';
import Cookies from 'js-cookie';

const Profile = () => {
  const activeWorkspaceId = useStore((state) => state.workspaceId);
  // console.log(activeWorkspaceId);

  const { data } = useQueryWrapper<ProfileAPIResponse, Error>(
    ['users', 'profile', 'me', activeWorkspaceId],
    () => getUserProfile(),
    {
      refetchOnMount: true,
      refetchOnWindowFocus: false,
    },
  );

  const setActiveUserId = userIdStore((state) => state.setActiveUserId);

  useEffect(() => {
    if (data && data.data?.id) {
      setActiveUserId(data.data?.id);
    }
  }, [data]);
>>>>>>> a24cff3b (fix(CE): sign in page reload on logout (#186))

  const showToast = useCustomToast();

  const handleLogout = async () => {
    const logoutResponse = await logout();
<<<<<<< HEAD
<<<<<<< HEAD
=======
    useStore.getState().clearState();
>>>>>>> 0b1ba760 (feat(EE): updated postgres to AIS Datastore (#184))
    if (logoutResponse.data) {
<<<<<<< HEAD
=======
      window.location.href = '/sign-in';
      Cookies.remove('authToken');
      useStore.getState().clearState();
>>>>>>> 197a0649 (fix(CE): clear workspace state on logout (#196))
=======

    if (logoutResponse.data) {
      window.location.href = '/sign-in';
      Cookies.remove('authToken');
>>>>>>> a24cff3b (fix(CE): sign in page reload on logout (#186))
      showToast({
        title: 'Signed out successfully',
        isClosable: true,
        duration: 5000,
        status: CustomToastStatus.Success,
        position: 'bottom-right',
      });
<<<<<<< HEAD
<<<<<<< HEAD
      navigate('/sign-in');
=======
>>>>>>> a24cff3b (fix(CE): sign in page reload on logout (#186))
=======
      // need to reset the state completely
      navigate('/sign-in', { replace: true });
      window.location.reload();
>>>>>>> 0b1ba760 (feat(EE): updated postgres to AIS Datastore (#184))
    }
  };

  return (
    <>
      <Popover closeOnEsc>
        <PopoverTrigger>
          <Box cursor='pointer'>
            <Box bgColor='gray.200' px={2} py={2} rounded='lg' _hover={{ bgColor: 'gray.300' }}>
              <HStack spacing={0}>
                <Avatar
                  name={data?.data?.attributes?.name}
                  mr={1}
                  bgColor='brand.400'
                  marginRight={2}
                  color='gray.100'
                  size='sm'
                  fontWeight='extrabold'
                />
                <VStack spacing={0} align='start'>
                  <Box w='128px' maxW='128px'>
                    <Text size='sm' fontWeight='semibold' noOfLines={1}>
                      {data?.data?.attributes?.name}
                    </Text>
                    <Text color='black.200' size='xs' noOfLines={1}>
                      {data?.data?.attributes?.email}
                    </Text>
                  </Box>
                </VStack>
                <Box color='gray.600'>
                  <FiMoreVertical />
                </Box>
              </HStack>
            </Box>
          </Box>
        </PopoverTrigger>
        <PopoverContent w='182px' border='1px' borderColor='gray.400'>
          <PopoverBody margin={0} p={0}>
            <Button
              _hover={{ bgColor: 'gray.200' }}
              w='100%'
              py={3}
              px={2}
              display='flex'
              flexDir='row'
              alignItems='center'
              color='error.400'
              rounded='lg'
              onClick={handleLogout}
              as='button'
              justifyContent='start'
              border={0}
              variant='shell'
            >
              <FiLogOut />
              <Text size='sm' fontWeight={400} ml={3} color='error.500'>
                Sign Out
              </Text>
            </Button>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default Profile;
