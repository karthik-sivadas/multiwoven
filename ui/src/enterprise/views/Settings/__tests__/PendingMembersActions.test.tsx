import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { expect } from '@jest/globals';
import '@testing-library/jest-dom';

import { MemberItem } from '@/enterprise/services/types';
import PendingMembersActions from '../Members/PendingMembersActions';
import { resendUserInvite, deleteUser } from '@/enterprise/services/settings';

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
  resendUserInvite: jest.fn().mockResolvedValue({
    data: {
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
    },
  }),
  deleteUser: jest.fn().mockResolvedValue({ data: {} }),
}));

describe('Pending Member Actions', () => {
  it('should render Pending Member Actions and all options', async () => {
    const { getByTestId } = render(
      <PendingMembersActions workspaceId={1} user_id={mockUserData.id} handleRefetch={() => {}} />,
    );

    const actions = getByTestId('pending-member-actions-' + mockUserData.id);

    fireEvent.mouseDown(actions);

    await waitFor(() => {
      expect(screen.getByText('Resend Invitation')).toBeTruthy();
      expect(screen.getByText('Cancel Invitation')).toBeTruthy();
    });
  });

  it('should handle cancel invite', async () => {
    const { getByTestId } = render(
      <PendingMembersActions workspaceId={1} user_id={mockUserData.id} handleRefetch={() => {}} />,
    );

    const actions = getByTestId('pending-member-actions-' + mockUserData.id);
    fireEvent.mouseDown(actions);

    const cancelAction = getByTestId('cancel-invite-action-' + mockUserData.id);
    fireEvent.mouseDown(cancelAction);

    await waitFor(() => {
      expect(deleteUser).toHaveBeenCalledWith(1, mockUserData.id);
    });
  });
  it('should handle resend invite', async () => {
    const { getByTestId } = render(
      <PendingMembersActions workspaceId={1} user_id={mockUserData.id} handleRefetch={() => {}} />,
    );

    const actions = getByTestId('pending-member-actions-' + mockUserData.id);
    fireEvent.mouseDown(actions);

    const cancelAction = getByTestId('resend-invite-action-' + mockUserData.id);
    fireEvent.mouseDown(cancelAction);

    await waitFor(() => {
      expect(resendUserInvite).toHaveBeenCalledWith(1, mockUserData.id);
    });
  });
});
