# Kissuije

Kissuije (Qui suis-je ?) is a free multiplayer guessing game.   
Guess and deduce the character you have before other players find theirs!

`Qui suis-je ?` means `Who am i ?` in french.

## Getting Started

First, install all the dependencies :

```bash
pnpm install
```

Then, run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Development

**We do not take account of weird behavior for the moment (e.g. when a player leave the room in mid-game)**

- [x] **Name logic**
  - [x] If no name random name is generated, and not stored in local storage
  - [x] If name defined, then stored in local storage

- [x] **Create/Join room logic**
  - [x] We can create a room
  - [x] We can Join a room if it exists
  - [x] New room is created when joining a room that doesn't exist

- [x] **Room logic**
  - [x] Player who create the room is the owner
  - [x] If owner leave the room then another player is selected as owner
  - [x] Owner can launch the game if there is 2 or more players in the room

- [x] **Pre Game logic**
  - [x] When game is launched players must randomly choose each other's characters
  - [x] Players who have choose a character must wait for others
  - [x] When all player's character are choosed, game starts
  - [x] Players are ordered in a random order
  
- [ ] **Game logic**
  - [ ] Ask a question logic
    - [ ] When its their turn player can send their question
    - [ ] Other players choose between `yes`, `no`, and `i don't know`
    - [ ] If majority is `yes`, player can ask another question
    - [ ] If majority is `no`, we pass to the next player
    - [ ] If there is no `yes` or `no` answers, or they are equal then player can ask another question
  - [ ] Try to guess character
    - [ ] When its their turn player can try to guess the character
    - [ ] If majority is `yes` then player win (we store the ranking) and we pass to the next player
    - [ ] If majority is `no` then we pass to the next player=
    - [ ] When there is one player left, game is ended

- [ ] **End Game logic**
  - [ ] Print player ranking
  - [ ] Print Overview of the game (everybody's ranking + character)
  - [ ] Replay button which launch another game
  - [ ] Create new room button