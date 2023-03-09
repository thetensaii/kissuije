import Button from 'components/atom/Button';
import { InputText } from 'components/atom/InputText';
import { Typo } from 'components/atom/Typo';
import { AvatarType } from 'lib/frontend/types/svg';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card } from '../Card';
import { SelectAvatarForm } from '../SelectAvatarForm';
import styles from './PlayerForm.module.scss';

type PlayerFormType = 'createRoom' | 'joinRoom';
type Props = {
  initialName: string;
  type: PlayerFormType;
} & (
  | {
      type: 'createRoom';
      createGameRoom: (name: string, avatar: AvatarType) => void;
      joinGameRoom?: undefined;
    }
  | {
      type: 'joinRoom';
      joinGameRoom: (name: string, avatar: AvatarType) => void;
      createGameRoom: (name: string, avatar: AvatarType) => void;
    }
);

type PlayerFormData = {
  name: string;
};

export const PlayerForm = ({ initialName, type, createGameRoom, joinGameRoom }: Props): JSX.Element => {
  const [avatar, setAvatar] = useState<AvatarType>(AvatarType.AvatarHello);

  const { register, handleSubmit, watch, setValue, setFocus } = useForm<PlayerFormData>();

  useEffect(() => {
    setValue('name', initialName);
  }, [initialName, setValue]);

  useEffect(() => {
    setFocus('name');
  }, [setFocus]);

  const handleFormSubmit = ({ name }: PlayerFormData): void => {
    if (type === 'createRoom') createGameRoom(name, avatar);
    else joinGameRoom(name, avatar);
  };

  const handleCreateRoomBtn = (): void => {
    const name = watch('name');
    createGameRoom(name, avatar);
  };

  return (
    <section className={styles.container}>
      <Card>
        <form className={styles.playerForm} onSubmit={handleSubmit(handleFormSubmit)}>
          <fieldset className={styles.fieldset}>
            <SelectAvatarForm onChange={setAvatar} />
          </fieldset>
          <fieldset className={styles.fieldset}>
            <Typo tag="h2" variant="heading2" font="medium">
              Choisis ton pseudo
            </Typo>
            <InputText type="text" {...register('name')} placeholder="Saisir ton pseudo" />
            {type === 'createRoom' ? (
              <Button type="submit">Créer une partie</Button>
            ) : (
              <Button type="submit" variant="secondary">
                Rejoindre la partie
              </Button>
            )}
          </fieldset>
        </form>
      </Card>

      {type === 'joinRoom' && (
        <Button variant="ternary" onClick={handleCreateRoomBtn} className={styles.alternativeCreateRoomBtn}>
          Créer une partie privée
        </Button>
      )}
    </section>
  );
};
