import { SocketAttemptType } from 'lib/common/socketsTypes';
import { PlayerType } from './player';

export interface AttemptType {
  type: 'guess' | 'question';
  askerId: PlayerType['id'];
  text: string;
  isAnswered: boolean;
}

export const convertSocketAttemptToFrontendAttempt = (attempt: SocketAttemptType): AttemptType => {
  return { ...attempt, isAnswered: false };
};
