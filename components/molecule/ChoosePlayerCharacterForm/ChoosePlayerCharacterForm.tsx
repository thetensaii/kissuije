import Button from 'components/atom/Button';
import { Input } from 'components/atom/Input';
import { PlayerType } from 'lib/frontend/types/player';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { ChoosenPlayerCard } from '../ChoosenPlayerCard';
import styles from './ChoosePlayerCharacterForm.module.scss';

type ChoosePlayerCharacterFormData = {
  character: string;
};

type Props = {
  playerChoosed: PlayerType;
  onSubmit: (character: string) => void;
};

export const ChoosePlayerCharacterForm = ({ playerChoosed, onSubmit }: Props): JSX.Element => {
  const { register, handleSubmit, setFocus } = useForm<ChoosePlayerCharacterFormData>();

  const handleFormSubmit = ({ character }: ChoosePlayerCharacterFormData): void => {
    onSubmit(character);
  };

  useEffect(() => {
    setFocus('character');
  }, [setFocus]);

  return (
    <div className={styles.container}>
      <ChoosenPlayerCard player={playerChoosed} />
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Input {...register('character')} type="text" required placeholder="Saisir le nom du personnage" />
        <Button type="submit">Valider</Button>
      </form>
    </div>
  );
};
