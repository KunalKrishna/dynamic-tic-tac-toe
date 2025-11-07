import React, { useState, useEffect } from 'react';
import './TicTacToe.css';

type Player = 'X' | 'O' | null;

interface Square {
  value: Player;
  timestamp: number;
  isOldest: boolean;
}

const TicTacToe: React.FC = () => {
  const [squares, setSquares] = useState<Square[]>(
    Array(9).fill(null).map(() => ({ value: null, timestamp: 0, isOldest: false }))
  );
  const [isXNext, setIsXNext] = useState<boolean>(true);
  const [xMoves, setXMoves] = useState<number[]>([]);
  const [oMoves, setOMoves] = useState<number[]>([]);

  useEffect(() => {
    // Mark oldest moves for fade-out animation
    setSquares(prevSquares => {
      const newSquares = prevSquares.map(sq => ({ ...sq, isOldest: false }));
      
      // Mark oldest X move if X has 3 moves
      // xMoves[0] is the oldest move due to FIFO ordering (first in, first out)
      if (xMoves.length === 3) {
        const oldestXIndex = xMoves[0];
        newSquares[oldestXIndex].isOldest = true;
      }
      
      // Mark oldest O move if O has 3 moves
      // oMoves[0] is the oldest move due to FIFO ordering (first in, first out)
      if (oMoves.length === 3) {
        const oldestOIndex = oMoves[0];
        newSquares[oldestOIndex].isOldest = true;
      }
      
      return newSquares;
    });
  }, [xMoves, oMoves]);

  const calculateWinner = (currentSquares: Square[]): Player => {
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

    for (const [a, b, c] of lines) {
      if (
        currentSquares[a].value &&
        currentSquares[a].value === currentSquares[b].value &&
        currentSquares[a].value === currentSquares[c].value
      ) {
        return currentSquares[a].value;
      }
    }
    return null;
  };

  const handleClick = (index: number) => {
    const newSquares = [...squares];
    
    // Don't allow clicking if square is already filled or game is won
    if (newSquares[index].value || calculateWinner(newSquares)) {
      return;
    }

    const currentPlayer = isXNext ? 'X' : 'O';
    const currentMoves = isXNext ? [...xMoves] : [...oMoves];
    
    // If player already has 3 moves, remove the oldest one (FIFO - first in, first out)
    if (currentMoves.length === 3) {
      const oldestIndex = currentMoves.shift();
      if (oldestIndex !== undefined) {
        newSquares[oldestIndex] = { value: null, timestamp: 0, isOldest: false };
      }
    }
    
    // Add the new move
    const timestamp = Date.now();
    newSquares[index] = { value: currentPlayer, timestamp, isOldest: false };
    currentMoves.push(index);
    
    setSquares(newSquares);
    
    if (isXNext) {
      setXMoves(currentMoves);
    } else {
      setOMoves(currentMoves);
    }
    
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null).map(() => ({ value: null, timestamp: 0, isOldest: false })));
    setIsXNext(true);
    setXMoves([]);
    setOMoves([]);
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else {
    status = `Next player: ${isXNext ? 'X' : 'O'}`;
  }

  const renderSquare = (index: number) => {
    const square = squares[index];
    const className = `square${square.isOldest ? ' fade-out' : ''}`;
    
    return (
      <button
        key={index}
        className={className}
        onClick={() => handleClick(index)}
      >
        {square.value}
      </button>
    );
  };

  return (
    <div className="game">
      <div className="game-info">
        <h1>Dynamic Tic-Tac-Toe</h1>
        <p className="rules">Each player can mark a maximum of 3 squares. Before marking the 4th square, the oldest mark fades away.</p>
        <div className="status">{status}</div>
        <button className="reset-button" onClick={resetGame}>
          Reset Game
        </button>
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
    </div>
  );
};

export default TicTacToe;
