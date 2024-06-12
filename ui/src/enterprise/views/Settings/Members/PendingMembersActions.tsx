import {
  Box,
  Button,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';
import { FiMoreHorizontal, FiSend, FiTrash2 } from 'react-icons/fi';
import { CustomToastStatus } from '@/components/Toast/index';
import useCustomToast from '@/hooks/useCustomToast';
import { deleteUser, resendUserInvite } from '@/enterprise/services/settings';

const PendingMembersActions = ({
  workspaceId,
  user_id,
  handleRefetch,
}: {
  workspaceId: number;
  user_id: number;
  handleRefetch: () => void;
}) => {
  const showToast = useCustomToast();

  const handleDeleteInvite = async () => {
    try {
      await deleteUser(workspaceId, user_id);
      showToast({
        title: 'Invite deleted successfully',
        isClosable: true,
        duration: 5000,
        status: CustomToastStatus.Success,
        position: 'bottom-right',
      });
      handleRefetch();
    } catch {
      showToast({
        status: CustomToastStatus.Error,
        title: 'Error!',
        description: 'Something went wrong while deleting the invite',
        position: 'bottom-right',
        isClosable: true,
      });
    }
  };

  const handleResendInvite = async () => {
    try {
      const resendInviteResponse = await resendUserInvite(workspaceId, user_id);
      if (resendInviteResponse?.data) {
        showToast({
          title: 'Invite resent successfully',
          isClosable: true,
          duration: 5000,
          status: CustomToastStatus.Success,
          position: 'bottom-right',
        });
      } else {
        showToast({
          title: 'Error!',
          description: 'Something went wrong while resending the invite',
          position: 'bottom-right',
          isClosable: true,
          status: CustomToastStatus.Error,
        });
      }
    } catch {
      showToast({
        status: CustomToastStatus.Error,
        title: 'Error!',
        description: 'Something went wrong while resending the invite',
        position: 'bottom-right',
        isClosable: true,
      });
    }
  };

  return (
    <>
      <Popover closeOnEsc closeOnBlur>
        {({ onClose }) => (
          <>
            <PopoverTrigger>
              <Box>
                <Box
                  cursor='pointer'
                  bgColor='gray.300'
                  px={3}
                  ml={6}
                  _hover={{ bgColor: 'gray.400' }}
                  border='1px'
                  borderColor='gray.500'
                  borderStyle='solid'
                  borderRadius='6px'
                  height='32px'
                  width='32px'
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                  data-testid={'pending-member-actions-' + user_id}
                >
                  <Box>
                    <FiMoreHorizontal />
                  </Box>
                </Box>
              </Box>
            </PopoverTrigger>
            <PopoverContent
              w='182px'
              border='1px'
              borderColor='gray.400'
              borderStyle='solid'
              mr={8}
            >
              <PopoverBody margin={0} p={0}>
                <Button
                  _hover={{ bgColor: 'gray.200' }}
                  w='100%'
                  py={3}
                  px={2}
                  display='flex'
                  flexDir='row'
                  alignItems='center'
                  rounded='lg'
                  onClick={onClose}
                  onMouseDown={handleResendInvite}
                  as='button'
                  justifyContent='start'
                  border={0}
                  variant='shell'
                  leftIcon={<FiSend />}
                  textColor='gray.600'
                  data-testid={'resend-invite-action-' + user_id}
                >
                  <Text size='sm' fontWeight='medium' color='black.500'>
                    Resend Invitation
                  </Text>
                </Button>
                <Button
                  _hover={{ bgColor: 'gray.200' }}
                  w='100%'
                  py={3}
                  px={2}
                  display='flex'
                  flexDir='row'
                  alignItems='center'
                  rounded='lg'
                  onClick={onClose}
                  onMouseDown={handleDeleteInvite}
                  as='button'
                  justifyContent='start'
                  border={0}
                  variant='shell'
                  textColor='gray.600'
                  leftIcon={<FiTrash2 />}
                  data-testid={'cancel-invite-action-' + user_id}
                >
                  <Text size='sm' fontWeight='medium' color='black.500'>
                    Cancel Invitation
                  </Text>
                </Button>
              </PopoverBody>
            </PopoverContent>
          </>
        )}
      </Popover>
    </>
  );
};

export default PendingMembersActions;
