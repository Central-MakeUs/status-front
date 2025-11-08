import { useState } from 'react';
import { Header } from '@/widgets/global-header/ui/header';
import { UserProfile } from './ui/user-profile/user-profile';
import { UserProfileActionList } from './ui/user-profile-action-list/user-profile-action-list';
import { NicknameBottomSheet } from '@/pages/profile/ui/nickname-bottom-sheet/nickname-bottom-sheet';
import { LogoutDialog } from '@/pages/profile/ui/logout-dialog/logout-dialog';
import { WithdrawalDialog } from '@/pages/profile/ui/withdrawal-dialog/withdrawal-dialog';

export const ProfilePage = () => {
  const [isNicknameEditOpen, setIsNicknameEditOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const [isWithdrawalDialogOpen, setIsWithdrawalDialogOpen] = useState(false);

  const openNicknameEditBottomSheet = () => setIsNicknameEditOpen(true);
  const openLogoutDialog = () => setIsLogoutDialogOpen(true);
  const openWithdrawalDialog = () => setIsWithdrawalDialogOpen(true);

  const closeNicknameEditBottomSheet = () => setIsNicknameEditOpen(false);
  const closeLogoutDialog = () => setIsLogoutDialogOpen(false);
  const closeWithdrawalDialog = () => setIsWithdrawalDialogOpen(false);

  return (
    <>
      <Header>
        <Header.Title>마이</Header.Title>
      </Header>
      <main className="main">
        <UserProfile onEditNickname={openNicknameEditBottomSheet} />
        <UserProfileActionList
          onLogout={openLogoutDialog}
          onWithdrawal={openWithdrawalDialog}
        />
      </main>
      <NicknameBottomSheet
        isOpen={isNicknameEditOpen}
        onClose={closeNicknameEditBottomSheet}
      />
      <LogoutDialog isOpen={isLogoutDialogOpen} onClose={closeLogoutDialog} />
      <WithdrawalDialog
        isOpen={isWithdrawalDialogOpen}
        onClose={closeWithdrawalDialog}
      />
    </>
  );
};

export default ProfilePage;
