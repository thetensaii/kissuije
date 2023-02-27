import React from 'react';
import Button from 'components/atom/Button';
import { InputText } from 'components/atom/InputText';
import { H2 } from 'components/atom/Typo/H2';
import styles from './LobbyInvitation.module.scss';
import { toast } from 'react-toastify';

type Props = {
  invitationLink: string;
};

export const LobbyInvitation = React.memo(({ invitationLink }: Props): JSX.Element => {
  const copyRoomLink = (): void => {
    navigator.clipboard.writeText(invitationLink);
    toast.info('Le lien a bien été copié');
  };

  return (
    <div className={styles.lobbyInvitation}>
      <H2>Inviter des amis</H2>
      <p>Envoyez le lien d’invitation ci-dessous à vos amis afin qu’il puisse rejoindre la partie</p>
      <InputText disabled value={invitationLink} />
      <Button variant="secondary" className={styles.copyLinkButton} rightIcon="Link" onClick={copyRoomLink}>
        Copier le lien d’invitation
      </Button>
    </div>
  );
});
LobbyInvitation.displayName = 'LobbyInvitation';
