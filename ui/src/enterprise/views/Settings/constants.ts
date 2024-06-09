import { MembersListColumns, MembersListColumnsEnum } from './types';

export const MEMBERS_LIST_COLUMNS: Array<MembersListColumns> = [
  {
    key: MembersListColumnsEnum.Name,
    name: 'Name',
  },
  {
    key: MembersListColumnsEnum.Email,
    name: 'Email',
  },
  {
    key: MembersListColumnsEnum.Role,
    name: 'Role',
  },
  {
    key: MembersListColumnsEnum.DateAdded,
    name: 'Date Added',
  },
  {
    key: MembersListColumnsEnum.Actions,
    name: '',
  },
];
