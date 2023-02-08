# Kissuije

Kissuije (Qui suis-je ?) is a free multiplayer guessing game.   
Guess and deduce the character you have before other players find theirs!

`Qui suis-je ?` means `Who am i ?` in french.

## Getting Started

First, copy `.env.example` file as `.env.local` :

```bash
cp .env.example .env.local
```

Then, install all the dependencies :

```bash
pnpm install
```

Finally, run the development server:

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
  - [x] Every player ask a question or try to guess at the same time
    - [x] Ask a Question
    - [x] Try to Guess
  - [x] Every player answer every other players questions/guesses at the same time
    - [x] If Question players choose between `yes`, `no`, and `i don't know` to answer
    - [x] If Guess players choose between `yes` and `no` to answer
  - [x] Handle Round Results
    - [x] If Question print Results
    - [x] If Guess and majority answers are `yes`, player win and game is ended

- [x] **End Game logic**
  - [x] Print player ranking + character
  - [x] Print Overview of the game (everybody's ranking + character)
  - [x] Replay button which launch another game
  - [x] Back Home button
