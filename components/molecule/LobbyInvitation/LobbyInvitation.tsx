import Button from 'components/atom/Button';
import { InputText } from 'components/atom/InputText';
import styles from './LobbyInvitation.module.scss';

type Props = {
  invitationLink: string;
};

export const LobbyInvitation = ({ invitationLink }: Props): JSX.Element => {
  const copyRoomLink = (): void => {
    navigator.clipboard.writeText(invitationLink);
  };

  return (
    <div className={styles.lobbyInvitation}>
      <h2>Inviter des amis</h2>
      <p>Envoyez le lien d’invitation ci-dessous à vos amis afin qu’il puisse rejoindre la partie</p>
      <InputText disabled value={invitationLink} />
      <Button variant="secondary" className={styles.copyLinkButton} rightIcon="Link" onClick={copyRoomLink}>
        Copier le lien d’invitation
      </Button>
    </div>
  );
};
