import { MembersListColumnsEnum } from '../types';
import { MemberItem } from '@/enterprise/services/types';
import { RoleDropdown } from './RoleDropdown';
import { Box, Text } from '@chakra-ui/react';
import dayjs from 'dayjs';
import ExistingMemberActions from './ExistingMemberActions';

type TableItem = {
  field: MembersListColumnsEnum;
  data: MemberItem;
  handleRefetchFn: () => void;
  userId: number;
  workspaceId: number;
};

export const TableItem = ({
  field,
  data,
  workspaceId,
  userId,
  handleRefetchFn,
}: TableItem): JSX.Element => {
  switch (field) {
    case MembersListColumnsEnum.DateAdded:
      return <Text fontSize='sm'>{dayjs(data?.attributes?.created_at).format('DD/MM/YYYY')}</Text>;

    case MembersListColumnsEnum.Role:
      return <RoleDropdown userData={data} />;

    case MembersListColumnsEnum.Name:
      return (
        <Text fontSize='sm' fontWeight='semibold'>
          {data?.attributes?.name}
        </Text>
      );

    case MembersListColumnsEnum.Email:
      return (
        <Text fontSize='sm' fontWeight='semibold'>
          {data?.attributes?.email}
        </Text>
      );
    case MembersListColumnsEnum.Actions:
      return (
        <Box display='flex' justifyContent='end'>
          <ExistingMemberActions
            workspaceId={workspaceId}
            user_id={data?.id}
            handleRefetch={handleRefetchFn}
            isDisabled={data?.id === userId}
          />
        </Box>
      );
  }
};
