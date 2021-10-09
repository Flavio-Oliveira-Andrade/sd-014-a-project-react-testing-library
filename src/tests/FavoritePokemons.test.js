import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from '../components/renderWithRouter';

describe('Testa o componente "FavoritePokemons"', () => {
  test('Verifica se é exibido na tela a mensagem `No favorite pokemon found`,'
  + 'se a pessoa não tiver pokémons favoritos', () => {
    // const { history } = renderWithRouter(<App />);
    renderWithRouter(<App />);

    // history.push('/favorites');
    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoriteLink);

    const noFavoriteText = screen.getByText('No favorite pokemon found');
    expect(noFavoriteText).toBeInTheDocument();
  });

  test('Verifica se é exibido todos os cards de pokémons favoritados', () => {
    // const { history } = renderWithRouter(<App />);
    renderWithRouter(<App />);

    const moreDetailsButton = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsButton);

    const favoriteCheckbox = screen.getByRole('checkbox');
    expect(favoriteCheckbox).toBeInTheDocument();
    userEvent.click(favoriteCheckbox);

    // history.push('/favorites');
    const favoriteLink = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(favoriteLink);

    const pokemonName = screen.getByText(/pikachu/i);
    const pokemonType = screen.getByText(/electric/i);
    const pokemonWeight = screen.getByText(/average/i);
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonWeight).toBeInTheDocument();
  });
});
