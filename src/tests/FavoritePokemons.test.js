import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('FavoritePokemons.js test', () => {
  it('Testa se é exibido na tela a mensagem No favorite pokemon found, '
  + 'se a pessoa não tiver pokémons favoritos.', () => {
    renderWithRouter(<App />);
    const favoritePoke = screen.getByText('Favorite Pokémons');
    userEvent.click(favoritePoke);
    const notFavo = screen.getByText('No favorite pokemon found');
    expect(notFavo).toBeInTheDocument();
  });
  it('Testa se é exibido todos os cards de pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByText('More details');

    userEvent.click(moreDetails);

    const input = screen.getByRole('checkbox');
    expect(input.checked).toBe(false);

    userEvent.click(input);

    expect(input.checked).toBe(true);
    const favoritePoke = screen.getByText('Favorite Pokémons');

    userEvent.click(favoritePoke);

    const name = screen.getByTestId('pokemon-name');
    expect(name).toBeInTheDocument();

    const type = screen.getByTestId('pokemon-type');
    expect(type).toBeInTheDocument();

    const average = screen.getByTestId('pokemon-weight');
    expect(average).toBeInTheDocument();
  });
});
