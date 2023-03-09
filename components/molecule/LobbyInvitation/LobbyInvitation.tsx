import React from 'react';
import Button from 'components/atom/Button';
import { InputText } from 'components/atom/InputText';
import styles from './LobbyInvitation.module.scss';
import { toast } from 'react-toastify';
import { Typo } from 'components/atom/Typo';

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
      <Typo tag="h2" variant="heading2" font="medium">
        Inviter des amis
      </Typo>
      <p>Envoyez le lien d’invitation ci-dessous à vos amis afin qu’il puisse rejoindre la partie</p>
      <InputText disabled value={invitationLink} />
      <Button variant="secondary" rightIcon="Link" onClick={copyRoomLink}>
        Copier le lien d’invitation
      </Button>
    </div>
  );
});
LobbyInvitation.displayName = 'LobbyInvitation';
