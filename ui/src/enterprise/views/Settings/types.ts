export enum MembersListColumnsEnum {
  Name = 'name',
  Email = 'email',
  Role = 'role',
  DateAdded = 'date_added',
  Actions = '',
}

export type MembersListColumns = {
  key: MembersListColumnsEnum;
  name: string;
  hasHoverText?: boolean;
  hoverText?: string;
};
