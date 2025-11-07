# Dynamic Tic-Tac-Toe

A React-based implementation of a dynamic tic-tac-toe game where each player can mark a maximum of only 3 squares. Before marking the 4th square, the oldest of the existing 3 marks slowly fades away and is removed.

![Dynamic Tic-Tac-Toe Game](https://github.com/user-attachments/assets/f120c7f6-563f-4733-8227-399e601c9deb)

## Game Features

- **3-Move Limitation**: Each player (X and O) can only have 3 marks on the board at any time
- **Dynamic Gameplay**: When a player makes their 4th move, their oldest move automatically fades out and is removed
- **Fade-Out Animation**: The oldest move is visually indicated with a fade-out effect before being removed
- **Winner Detection**: The game detects when a player achieves three in a row
- **Reset Functionality**: Easy game reset button to start a new game
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful gradient background with smooth animations

## How to Play

1. Players take turns placing their marks (X or O) on the 3x3 grid
2. Each player can have a maximum of 3 marks on the board
3. When a player has 3 marks and makes a 4th move, their oldest mark will fade away
4. The oldest mark is indicated by a lighter appearance before it disappears
5. The first player to get three marks in a row (horizontally, vertically, or diagonally) wins
6. Click "Reset Game" to start a new game at any time

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

1. Clone the repository:
\`\`\`bash
git clone https://github.com/KunalKrishna/dynamic-tic-tac-toe.git
cd dynamic-tic-tac-toe
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Start the development server:
\`\`\`bash
npm start
\`\`\`

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Available Scripts

In the project directory, you can run:

### \`npm start\`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### \`npm test\`

Launches the test runner in the interactive watch mode.
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### \`npm run build\`

Builds the app for production to the \`build\` folder.
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Technology Stack

- **React 19.2.0** - UI library
- **TypeScript 4.9.5** - Type-safe JavaScript
- **CSS3** - Styling with animations
- **React Testing Library** - Component testing
- **Create React App** - Project scaffolding

## Project Structure

\`\`\`
src/
├── App.tsx              # Main app component
├── App.test.tsx         # App component tests
├── TicTacToe.tsx        # Main game component with logic
├── TicTacToe.test.tsx   # Game component tests
├── TicTacToe.css        # Game styling and animations
├── index.tsx            # App entry point
└── index.css            # Global styles
\`\`\`

## Testing

The project includes comprehensive tests for both the App and TicTacToe components:

- Game initialization tests
- Move alternation tests
- 3-move limitation tests
- Winner detection tests
- Reset functionality tests

Run tests with:
\`\`\`bash
npm test
\`\`\`

## License

This project is open source and available under the [MIT License](LICENSE).

## Acknowledgments

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
