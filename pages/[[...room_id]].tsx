import React, { useCallback, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/Home.module.scss'
import Button from '../components/atom/Button';
import { useUser } from '../providers/UserProvider';
import { useRoom } from '../hooks/useRoom';
import Head from 'next/head';
import { isStringEmpty } from '../utils/functions';
import generateRandomName from '../utils/generateRandomName';
import { SceneState } from '../utils/game';

export default function Room() {
  const [sceneState, setSceneState] = useState<SceneState>(SceneState.HOME)
  const router = useRouter();
  const { room_id } = router.query;
  const { name, setName } = useUser();
  const {
    player,
    joinedRoom,
    players,
    selectedPlayer,
    createRoom,
    joinRoom,
    startGame,
    validatePlayerCharacter
  } = useRoom(setSceneState)

  const nameInputRef = useRef<HTMLInputElement>(null);
  const characterInputRef = useRef<HTMLInputElement>(null);

  const getAndStoreFormName = (): string => {
    let name: string = generateRandomName()
    if (nameInputRef.current?.value && !isStringEmpty(nameInputRef.current.value)) {
      name = nameInputRef.current.value;
      localStorage.setItem('name', name);
    } else {
      localStorage.removeItem('name');
    }

    setName(name)

    return name;
  }

  const createPartyRoom = () => {
    const newName = getAndStoreFormName()

    const newRoomID = createRoom(newName)
    redirectToRoom(newRoomID)
  }

  const joinPartyRoom = async () => {
    const newName = getAndStoreFormName()

    const roomID = room_id?.toString() ?? '';
    const joinedRoomID = await joinRoom(newName, roomID)
    redirectToRoom(joinedRoomID)
  }

  const redirectToRoom = (roomID: string) => {
    router.push(`/${roomID}`, undefined, { shallow: true });
  }

  const copyRoomLink = useCallback(() => {
    navigator.clipboard.writeText(process.env.NEXT_PUBLIC_HOST + '/' + room_id)
  }, [room_id]);

  const validateCharacter = () => {
    if (!selectedPlayer) {
      alert('Une erreur est survenue')
      return
    }

    if (!(characterInputRef.current?.value) || isStringEmpty(characterInputRef.current.value)) {
      alert('Il faut saisir un personnage');
      return;
    }

    const character = characterInputRef.current.value;
    validatePlayerCharacter(selectedPlayer.id, character);
  }

  return <>
    <Head>
      <title>Kissuije - Jeu Gratuit Multijoueur de Devinettes & Déduction</title>
      <meta name="description" content="Kissuije (Qui suis-je ?) est un jeu de devinettes multijoueur gratuit. Devinez et déduisez le personnage que vous avez avant que les autres joueurs trouvent les leur !" />
      <link rel="icon" href="/favicon.ico" />
    </Head>

    <main className={styles.container}>
      <h2>{sceneState}</h2>
      {sceneState === SceneState.HOME &&
        <>
          <h1>Kissuije</h1>
          <div>
            <label htmlFor='name'>
              Pseudo :
            </label>
            <input
              type="text"
              id='name'
              ref={nameInputRef}
              defaultValue={name}
              placeholder="Entre ton pseudo"
            />
          </div>

          {room_id &&
            <Button onClick={joinPartyRoom}>
              Rejoindre partie
            </Button>}

          <Button onClick={createPartyRoom}>
            Créer une salle privée
          </Button>
        </>
      }

      {sceneState === SceneState.ROOM_JOINED &&
        <>
          <h1>{room_id}</h1>

          {(player?.isOwner && players.length > 1) &&
            <Button onClick={() => startGame(joinedRoom ? joinedRoom : '')}>
              Lancer la partie
            </Button>}

          <h3>Liste des participants</h3>
          <ul>
            <li>{`${name} (moi)`}</li>
            {players.filter(p => {
              if (!player) return true;
              return p.id !== player.id
            }).map((player) => (<li key={player.id}>{player.name}</li>))}
          </ul>



          <Button onClick={copyRoomLink}>
            Copier le lien d'invitation
          </Button>

          <a href="/">
            <Button>
              Retour à l'accueil
            </Button>
          </a>
        </>
      }


      {(sceneState === SceneState.CHOOSE_CHARACTER && selectedPlayer) &&
        <>
          <h3>Choisissez le personnage de : {selectedPlayer.name} </h3>

          <input
            type="text"
            placeholder="Entrez un personnage"
            ref={characterInputRef}
          />

          <Button onClick={validateCharacter}>
            Valider le personnage
          </Button>
        </>
      }

      {(sceneState === SceneState.WAIT_THAT_OTHERS_CHOOSE && selectedPlayer?.character) &&
        <>
          <div>
            <h3>Tu as choisi : {selectedPlayer.character}</h3>
            <h4>Pour {selectedPlayer.name}</h4>
          </div>

          <p>Nombre de vote : {players.filter(p => p.character !== undefined).length} / {players.length}</p>
        </>
      }

      {(sceneState === SceneState.GAME && player) &&
        <>
          <h1>C'est PARTI !!!!</h1>
          <ul>
            {players.map(p => {
              if (p.id === player.id) return <li key={p.id}>{p.name} <i>(moi)</i></li>
              return <li key={p.id}>{p.name} <i>({p.character})</i></li>
            })}
          </ul>
        </>
      }

    </main>
  </>
}
