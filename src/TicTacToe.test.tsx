import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TicTacToe from './TicTacToe';

describe('TicTacToe Component', () => {
  test('renders the game board with 9 squares', () => {
    render(<TicTacToe />);
    const squares = screen.getAllByRole('button').filter(button => 
      !button.textContent?.includes('Reset')
    );
    expect(squares).toHaveLength(9);
  });

  test('places X on first click', () => {
    render(<TicTacToe />);
    const squares = screen.getAllByRole('button').filter(button => 
      !button.textContent?.includes('Reset')
    );
    
    fireEvent.click(squares[0]);
    expect(squares[0]).toHaveTextContent('X');
  });

  test('alternates between X and O', () => {
    render(<TicTacToe />);
    const squares = screen.getAllByRole('button').filter(button => 
      !button.textContent?.includes('Reset')
    );
    
    fireEvent.click(squares[0]);
    expect(squares[0]).toHaveTextContent('X');
    
    fireEvent.click(squares[1]);
    expect(squares[1]).toHaveTextContent('O');
    
    fireEvent.click(squares[2]);
    expect(squares[2]).toHaveTextContent('X');
  });

  test('limits player to 3 moves maximum', () => {
    render(<TicTacToe />);
    const squares = screen.getAllByRole('button').filter(button => 
      !button.textContent?.includes('Reset')
    );
    
    // X makes 3 moves
    fireEvent.click(squares[0]); // X
    fireEvent.click(squares[1]); // O
    fireEvent.click(squares[2]); // X
    fireEvent.click(squares[3]); // O
    fireEvent.click(squares[4]); // X (3rd move for X)
    fireEvent.click(squares[5]); // O
    
    // X has 3 moves at positions 0, 2, 4
    expect(squares[0]).toHaveTextContent('X');
    expect(squares[2]).toHaveTextContent('X');
    expect(squares[4]).toHaveTextContent('X');
    
    // X makes 4th move - oldest (position 0) should be removed
    fireEvent.click(squares[6]); // X (4th move - should remove position 0)
    
    expect(squares[0]).toHaveTextContent(''); // Removed
    expect(squares[2]).toHaveTextContent('X');
    expect(squares[4]).toHaveTextContent('X');
    expect(squares[6]).toHaveTextContent('X');
  });

  test('reset button clears the board', () => {
    render(<TicTacToe />);
    const squares = screen.getAllByRole('button').filter(button => 
      !button.textContent?.includes('Reset')
    );
    const resetButton = screen.getByRole('button', { name: /reset game/i });
    
    // Make some moves
    fireEvent.click(squares[0]);
    fireEvent.click(squares[1]);
    fireEvent.click(squares[2]);
    
    // Reset the game
    fireEvent.click(resetButton);
    
    // All squares should be empty
    squares.forEach(square => {
      expect(square).toHaveTextContent('');
    });
    
    // Should be X's turn again
    expect(screen.getByText(/next player: x/i)).toBeInTheDocument();
  });

  test('detects winner', () => {
    render(<TicTacToe />);
    const squares = screen.getAllByRole('button').filter(button => 
      !button.textContent?.includes('Reset')
    );
    
    // X wins with top row
    fireEvent.click(squares[0]); // X
    fireEvent.click(squares[3]); // O
    fireEvent.click(squares[1]); // X
    fireEvent.click(squares[4]); // O
    fireEvent.click(squares[2]); // X wins
    
    expect(screen.getByText(/winner: x/i)).toBeInTheDocument();
  });

  test('does not allow clicking on filled square', () => {
    render(<TicTacToe />);
    const squares = screen.getAllByRole('button').filter(button => 
      !button.textContent?.includes('Reset')
    );
    
    fireEvent.click(squares[0]); // X
    expect(squares[0]).toHaveTextContent('X');
    
    fireEvent.click(squares[0]); // Try to click again
    expect(squares[0]).toHaveTextContent('X'); // Should still be X
    
    // Should still be O's turn (didn't switch)
    expect(screen.getByText(/next player: o/i)).toBeInTheDocument();
  });
});
