import Table from '@/components/Table';
import { Box, Flex, Spacer, Text } from '@chakra-ui/react';
import { InviteMemberPopup } from './InviteMemberPopup';
import { useQuery } from '@tanstack/react-query';
import { getUsers } from '@/enterprise/services/settings';
import { getWorkspaces } from '@/services/settings';
import { useStore } from '@/stores';
import Loader from '@/components/Loader';
import { MEMBERS_LIST_COLUMNS } from '../constants';
import { TableItem } from './MembersTableItem';
import { PendingMemberItem } from './PendingMembersItem';
import { userIdStore } from '@/stores/userIdStore';

const Members = () => {
  // todo: need to add selection of multiple members in workspace members table
  // const [selected, setSelected] = useState(false);
  const activeWorkspaceId = useStore((state) => state.workspaceId);
  const activeUserId = userIdStore((state) => state.userId);

  const { data: workspaceData, isLoading: workspaceDataIsLoading } = useQuery({
    queryKey: ['workspace', activeWorkspaceId],
    queryFn: getWorkspaces,
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });

  const {
    data: membersData,
    isLoading: membersDataIsLoading,
    refetch: refetchMembersData,
  } = useQuery({
    queryKey: ['members', activeWorkspaceId],
    queryFn: () => getUsers(activeWorkspaceId),
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    enabled: !!activeWorkspaceId,
  });

  if (workspaceDataIsLoading || membersDataIsLoading) return <Loader />;

  if (!membersData || !workspaceData) return <Text>No members found</Text>;

  const membersDataArray = membersData?.data;

  const invitedUsers = membersDataArray?.filter((user) => user?.attributes?.status === 'invited');
  const workspaceUsers = membersDataArray?.filter((user) => user?.attributes?.status === 'active');

  const rows = workspaceUsers?.map((data) => {
    return MEMBERS_LIST_COLUMNS.reduce(
      (acc, { key }) => ({
        ...acc,
        [key]: (
          <TableItem
            field={key}
            data={data}
            workspaceId={activeWorkspaceId}
            userId={activeUserId}
            handleRefetchFn={refetchMembersData}
          />
        ),
      }),
      {},
    );
  });

  const tableData = {
    columns: MEMBERS_LIST_COLUMNS,
    data: rows,
    error: '',
  };

  return (
    <Box display='flex' flexDir='column' gap='24px'>
      {invitedUsers?.length > 0 ? (
        <Box
          bgColor='gray.100'
          border='1px'
          borderRadius='12px'
          p='24px'
          borderColor='gray.400'
          display='flex'
          flexDir='column'
          gap='24px'
        >
          <Text color='black.500' size='md' fontWeight='semibold'>
            Pending Invitations
          </Text>
          <Box display='flex' flexDir='column' gap='24px'>
            {invitedUsers?.map((member) => (
              <PendingMemberItem
                key={member?.id}
                email={member?.attributes?.email}
                inviteExpiryDate={member?.attributes?.invitation_due_at}
                userId={member?.id}
                workspaceId={activeWorkspaceId}
                handleRefetch={refetchMembersData}
              />
            ))}
          </Box>
        </Box>
      ) : (
        <></>
      )}
      <Box display='flex' flexDir='column' gap='24px'>
        <Flex dir='row'>
          <Text color='black.500' size='md' fontWeight='semibold' mt='auto'>
            Add or edit your member details
          </Text>
          <Spacer />
          <Box display='flex'>
            {/* To-do: implement the multi-user selection in the table */}
            {/* <Button
              variant='shell'
              color='red.600'
              size='md'
              leftIcon={<FiTrash2 />}
              width='fit-content'
              colorScheme='red.600'
              // hidden={!selected}
              onClick={() => refetchMembersData()}
            >
              Delete Member
            </Button> */}
            <InviteMemberPopup workspaceData={workspaceData} handleRefetch={refetchMembersData} />
          </Box>
        </Flex>
        <Table data={tableData} />
      </Box>
    </Box>
  );
};

export default Members;
