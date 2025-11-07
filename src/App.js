import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xMoves, setXMoves] = useState([]);
  const [oMoves, setOMoves] = useState([]);
  const [isXNext, setIsXNext] = useState(true);
  const [fadingSquare, setFadingSquare] = useState(null);
  const [winner, setWinner] = useState(null);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  useEffect(() => {
    const winner = calculateWinner(board);
    setWinner(winner);
  }, [board]);

  const handleClick = (i) => {
    if (board[i] || winner || fadingSquare !== null) {
      return;
    }

    const currentPlayer = isXNext ? 'X' : 'O';
    const currentMoves = isXNext ? xMoves : oMoves;
    const setCurrentMoves = isXNext ? setXMoves : setOMoves;

    if (currentMoves.length >= 3) {
      // Need to fade out the oldest move first
      const oldestMove = currentMoves[0];
      setFadingSquare(oldestMove);

      // Wait for fade animation to complete
      setTimeout(() => {
        const newBoard = [...board];
        newBoard[oldestMove] = null;
        newBoard[i] = currentPlayer;

        const newMoves = [...currentMoves.slice(1), i];
        setCurrentMoves(newMoves);
        setBoard(newBoard);
        setFadingSquare(null);
        setIsXNext(!isXNext);
      }, 500); // Match CSS animation duration
    } else {
      // Less than 3 moves, just add the new move
      const newBoard = [...board];
      newBoard[i] = currentPlayer;

      const newMoves = [...currentMoves, i];
      setCurrentMoves(newMoves);
      setBoard(newBoard);
      setIsXNext(!isXNext);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setXMoves([]);
    setOMoves([]);
    setIsXNext(true);
    setFadingSquare(null);
    setWinner(null);
  };

  const renderSquare = (i) => {
    const isFading = fadingSquare === i;
    return (
      <button
        className={`square ${isFading ? 'fading' : ''} ${board[i] ? 'filled' : ''}`}
        onClick={() => handleClick(i)}
      >
        {board[i]}
      </button>
    );
  };

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${isXNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game">
      <div className="game-info">
        <h1>Dynamic Tic-Tac-Toe</h1>
        <div className="status">{status}</div>
        <div className="rules">
          <p>Each player can mark maximum 3 squares.</p>
          <p>Before marking the 4th square, the oldest mark fades away.</p>
        </div>
      </div>
      <div className="game-board">
        <div className="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div className="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div className="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
      <button className="reset-button" onClick={resetGame}>
        Reset Game
      </button>
    </div>
  );
}

export default App;
