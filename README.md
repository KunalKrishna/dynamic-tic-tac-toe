# Dynamic Tic-Tac-Toe

A React-based dynamic tic-tac-toe game where each player can mark a maximum of 3 squares. Before marking the 4th square, the oldest mark slowly fades away.

## Features

- **Dynamic Gameplay**: Each player (X and O) can only have 3 marks on the board at any time
- **Fade Animation**: When a player tries to place a 4th mark, their oldest mark fades away smoothly
- **Win Detection**: Standard tic-tac-toe winning conditions (3 in a row)
- **Turn Indicator**: Shows which player's turn it is
- **Reset Functionality**: Reset button to start a new game
- **Responsive Design**: Works on desktop and mobile devices

## Game Rules

1. Players alternate turns (X goes first)
2. Click any empty square to place your mark
3. Each player can have a maximum of 3 marks on the board
4. When you try to place a 4th mark, your oldest mark will fade away first
5. First player to get 3 in a row (horizontal, vertical, or diagonal) wins
6. Click "Reset Game" to start over

## Installation

```bash
npm install
```

## Running the App

```bash
npm start
```

Opens the app in development mode at [http://localhost:3000](http://localhost:3000)

## Building for Production

```bash
npm run build
```

Builds the app for production to the `build` folder.

## Technologies Used

- React 19.2.0
- CSS3 with animations
- Create React App

## How It Works

The game tracks each player's moves in separate arrays (`xMoves` and `oMoves`). When a player has 3 moves and attempts to make a 4th move:

1. The oldest move (first in the array) is marked for fading
2. A fade-out CSS animation plays for 500ms
3. After the animation completes, the oldest move is removed from the board
4. The new move is placed
5. The moves array is updated (removes oldest, adds newest)

This creates a dynamic gameplay experience where players must think strategically about which squares to occupy.
