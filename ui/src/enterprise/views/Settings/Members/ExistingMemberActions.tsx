import {
  Box,
  Button,
  Popover,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
} from '@chakra-ui/react';
import { FiMoreHorizontal, FiTrash2 } from 'react-icons/fi';
import { CustomToastStatus } from '@/components/Toast/index';
import useCustomToast from '@/hooks/useCustomToast';
import { deleteUser } from '@/enterprise/services/settings';

const ExistingMemberActions = ({
  workspaceId,
  user_id,
  handleRefetch,
  isDisabled,
}: {
  workspaceId: number;
  user_id: number;
  handleRefetch: () => void;
  isDisabled: boolean;
}) => {
  const showToast = useCustomToast();

  const handleDeleteUser = async () => {
    try {
      await deleteUser(workspaceId, user_id);
      showToast({
        title: 'User deleted successfully',
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

  return (
    <>
      <Popover closeOnEsc placement='bottom-end'>
        {({ onClose }) => (
          <>
            <PopoverTrigger>
              <Box>
                <Box
                  cursor='pointer'
                  bgColor='gray.100'
                  px={3}
                  _hover={{ bgColor: 'gray.300', borderColor: 'gray.500' }}
                  border='1px'
                  borderColor='gray.400'
                  borderStyle='solid'
                  borderRadius='6px'
                  height='32px'
                  width='32px'
                  display='flex'
                  justifyContent='center'
                  alignItems='center'
                  data-testid={'existing-member-actions-' + user_id}
                >
                  <Box>
                    <FiMoreHorizontal />
                  </Box>
                </Box>
              </Box>
            </PopoverTrigger>
            <PopoverContent w='fit-content' border='1px' borderColor='gray.400' borderStyle='solid'>
              <PopoverBody margin={0} p={0}>
                <Button
                  _hover={{ bgColor: 'gray.200' }}
                  w='fit-content'
                  py='12px'
                  px='8px'
                  display='flex'
                  flexDir='row'
                  alignItems='center'
                  rounded='lg'
                  gap='8px'
                  onClick={handleDeleteUser}
                  onMouseDown={onClose}
                  as='button'
                  justifyContent='start'
                  border={0}
                  variant='shell'
                  textColor='error.500'
                  isDisabled={isDisabled}
                  data-testid={'delete-member-action-' + user_id}
                >
                  <FiTrash2 />
                  <Text size='sm' fontWeight='medium' w='112px' textAlign='start'>
                    Delete Member
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

export default ExistingMemberActions;
