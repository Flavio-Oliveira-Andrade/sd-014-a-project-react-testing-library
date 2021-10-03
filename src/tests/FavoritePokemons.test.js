import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoritePokemons from '../components/FavoritePokemons';
import RenderWithRouter from '../util/RenderWithRouter';
import App from '../App';

test('testando se não ouver favoritos', () => {
  RenderWithRouter(<FavoritePokemons />);
  const textSemFavoritos = screen.getByText('No favorite pokemon found');

  expect(textSemFavoritos).toBeInTheDocument();
});

test('testando quando tiver favoritos', () => {
  RenderWithRouter(<App />);
  const idNomePoke = screen.getByTestId('pokemon-name').innerHTML;
  const MoreDetails = screen.getByText('More details');
  userEvent.click(MoreDetails);
  const checkboxPok = screen.getByRole('checkbox', {
    name: 'Pokémon favoritado?',
  });
  userEvent.click(checkboxPok);
  const expectNomePok = screen.getByText(idNomePoke);
  expect(expectNomePok).toBeInTheDocument();
});
