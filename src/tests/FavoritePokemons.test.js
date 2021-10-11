import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

it('shows "No favorite pokemon found" on screen, if no favorites', () => {
  render(<FavoritePokemons pokemons={ [] } />);

  const text = screen.getByText(/No favorite pokemon found/i);
  expect(text).toBeDefined();
});

it('shows all the cards of favorite pokémons', () => {
  renderWithRouter(<App />);

  const details = screen.getByRole('link', { name: /More details/i });
  userEvent.click(details);

  const checkbox = screen.getByRole('checkbox');
  userEvent.click(checkbox);

  const favorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
  userEvent.click(favorite);

  const pikachuSprite = screen.getByAltText('Pikachu sprite');
  expect(pikachuSprite).toBeInTheDocument();
});
