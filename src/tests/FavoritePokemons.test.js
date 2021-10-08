// test('', () => {});
import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';

import App from '../App';
import { FavoritePokemons } from '../components';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found,'
  + 'se a pessoa não tiver pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);

    const notFound = screen.getByText(/No favorite pokemon found/i);
    expect(notFound).toBeInTheDocument();
  });

  test('Teste se é exibido todos os cards de pokémons favoritados', () => {
    renderWithRouter(<App />);

    const moreDetails = screen.getByText(/More details/i);
    fireEvent.click(moreDetails);

    const button = screen.getByText(/pokémon favorit/i);
    fireEvent.click(button);

    const favorites = screen.getByText(/Favorite Pokémons/i);
    fireEvent.click(favorites);

    const pokemon = screen.getByText(/pikachu/i);

    expect(pokemon).toBeInTheDocument();
  });
});
