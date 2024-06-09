import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { expect } from '@jest/globals';
import '@testing-library/jest-dom';

import { MemberItem } from '@/enterprise/services/types';
import ExistingMemberActions from '../Members/ExistingMemberActions';
import { deleteUser } from '@/enterprise/services/settings';

const mockUserData: MemberItem = {
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

jest.mock('@/enterprise/services/settings', () => ({
  deleteUser: jest.fn().mockResolvedValue({ data: {} }),
}));

describe('Existing Member Actions', () => {
  it('should render Existing Member Actions and all options', async () => {
    const { getByTestId } = render(
      <ExistingMemberActions
        workspaceId={1}
        user_id={mockUserData.id}
        handleRefetch={() => {}}
        isDisabled={false}
      />,
    );

    const actions = getByTestId('existing-member-actions-' + mockUserData.id);
    fireEvent.mouseDown(actions);

    await waitFor(() => {
      expect(screen.getByText('Delete Member')).toBeTruthy();
    });
  });

  it('should handle delete user', async () => {
    const { getByTestId } = render(
      <ExistingMemberActions
        workspaceId={1}
        user_id={mockUserData.id}
        handleRefetch={() => {}}
        isDisabled={false}
      />,
    );

    const actions = getByTestId('existing-member-actions-' + mockUserData.id);
    fireEvent.mouseDown(actions);

    const deleteAction = getByTestId('delete-member-action-' + mockUserData.id);
    fireEvent.click(deleteAction);

    await waitFor(() => {
      expect(deleteUser).toHaveBeenCalledWith(1, mockUserData.id);
    });
  });
});
