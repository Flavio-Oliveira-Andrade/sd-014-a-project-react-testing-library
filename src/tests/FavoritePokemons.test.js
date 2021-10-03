import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router';
import { FavoritePokemons } from '../components';
import App from '../App';

test('É exibido na tela a mensagem No favorite pokemon found, '
+ 'se a pessoa não tiver pokémons favoritos', () => {
  render(
    <MemoryRouter>
      <FavoritePokemons />
    </MemoryRouter>,
  );

  const favoritePokemonsText = screen.getByRole('heading', {
    level: 2,
    name: 'Favorite pokémons',
  });
  expect(favoritePokemonsText).toBeInTheDocument();

  const favoritePokemonNotFound = screen.getByText('No favorite pokemon found');
  expect(favoritePokemonNotFound).toBeInTheDocument();
});

test('É exibido todos os cards de pokémons favoritados.', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const linkElement = screen.getByRole('link', { name: 'More details' });
  userEvent.click(linkElement);

  const PokemonDetails = screen.getByLabelText('Pokémon favoritado?');
  userEvent.click(PokemonDetails);

  const favoritePokemonsElement = screen.getByRole('link', { name: 'Favorite Pokémons' });
  userEvent.click(favoritePokemonsElement);

  const favoritePokemonsText = screen.getByRole('heading', {
    level: 2,
    name: 'Favorite pokémons',
  });
  expect(favoritePokemonsText).toBeInTheDocument();

  const favoritePokemonNotFound = screen.queryByText('No favorite pokemon found');
  expect(favoritePokemonNotFound).not.toBeInTheDocument();
});
