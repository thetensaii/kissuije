import Button from 'components/atom/Button';
import { InputText } from 'components/atom/InputText';
import { Label } from 'components/atom/Label';
import { AvatarType } from 'lib/frontend/types/svg';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ContentWindow } from '../ContentWindow';
import { SelectAvatarForm } from '../SelectAvatarForm';
import styles from './PlayerForm.module.scss';

type PlayerFormType = 'createRoom' | 'joinRoom';
type Props = {
  initialName: string;
  type: PlayerFormType;
} & (
  | {
      type: 'createRoom';
      createGameRoom: (name: string) => void;
      joinGameRoom?: undefined;
    }
  | {
      type: 'joinRoom';
      joinGameRoom: (name: string) => void;
      createGameRoom: (name: string) => void;
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
    // eslint-disable-next-line no-console
    console.log('Avatar :', avatar);

    if (type === 'createRoom') createGameRoom(name);
    else joinGameRoom(name);
  };

  const handleCreateRoomBtn = (): void => {
    const name = watch('name');
    createGameRoom(name);
  };

  return (
    <section className={styles.container}>
      <ContentWindow>
        <form className={styles.playerForm} onSubmit={handleSubmit(handleFormSubmit)}>
          <fieldset className={styles.fieldset}>
            <SelectAvatarForm onChange={setAvatar} />
          </fieldset>
          <fieldset className={styles.fieldset}>
            <Label htmlFor="name">Choisis ton pseudo</Label>
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
      </ContentWindow>

      {type === 'joinRoom' && (
        <Button variant="ternary" onClick={handleCreateRoomBtn} className={styles.alternativeCreateRoomBtn}>
          Créer une partie privée
        </Button>
      )}
    </section>
  );
};
