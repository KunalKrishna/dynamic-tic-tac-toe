import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders dynamic tic-tac-toe game', () => {
  render(<App />);
  const heading = screen.getByText(/dynamic tic-tac-toe/i);
  expect(heading).toBeInTheDocument();
});

test('renders game rules', () => {
  render(<App />);
  const rules = screen.getByText(/each player can mark a maximum of 3 squares/i);
  expect(rules).toBeInTheDocument();
});

test('renders initial player status', () => {
  render(<App />);
  const status = screen.getByText(/next player: x/i);
  expect(status).toBeInTheDocument();
});

test('renders reset button', () => {
  render(<App />);
  const resetButton = screen.getByRole('button', { name: /reset game/i });
  expect(resetButton).toBeInTheDocument();
});
