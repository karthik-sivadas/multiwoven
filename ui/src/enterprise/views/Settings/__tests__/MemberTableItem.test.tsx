import { render } from '@testing-library/react';
import { expect } from '@jest/globals';
import '@testing-library/jest-dom';

import { TableItem } from '@/enterprise/views/Settings/Members/MembersTableItem';
import { MemberItem } from '@/enterprise/services/types';
import { MembersListColumnsEnum } from '../types';

const mockTableData: MemberItem = {
  id: 2,
  type: 'workspace_users',
  attributes: {
    name: 'User',
    email: 'user@squared.ai',
    role: 'Admin',
    created_at: '2024-05-23',
    status: 'active',
    invitation_created_at: '2024-01-01',
    invitation_due_at: '2024-01-01',
  },
};

jest.mock('dayjs');

describe('TableItem Component', () => {
  it('should render date_added field correctly', () => {
    const { getByText } = render(
      <TableItem
        field={MembersListColumnsEnum.DateAdded}
        data={mockTableData}
        handleRefetchFn={() => {}}
        userId={mockTableData.id}
        workspaceId={1}
      />,
    );
    expect(getByText('01/01/2024')).toBeTruthy();
  });

  it('should render name field correctly', () => {
    const { getByText } = render(
      <TableItem
        field={MembersListColumnsEnum.Name}
        data={mockTableData}
        handleRefetchFn={() => {}}
        userId={mockTableData.id}
        workspaceId={1}
      />,
    );
    expect(getByText('User')).toBeTruthy();
  });

  it('should render email field correctly', () => {
    const { getByText } = render(
      <TableItem
        field={MembersListColumnsEnum.Email}
        data={mockTableData}
        handleRefetchFn={() => {}}
        userId={mockTableData.id}
        workspaceId={1}
      />,
    );
    expect(getByText('user@squared.ai')).toBeTruthy();
  });
});
