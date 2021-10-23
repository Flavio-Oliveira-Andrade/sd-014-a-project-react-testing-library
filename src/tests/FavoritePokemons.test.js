import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('Verifica o componente <FavoritePokemons />', () => {
  test('Mensagem de erro aparece na falta de Favoritos', () => {
    renderWithRouter(<FavoritePokemons />);

    const mensagemErro = screen.getByText('No favorite pokemon found');

    expect(mensagemErro).toBeInTheDocument();
  });

  test('Exibe todos os cards favoritados', () => {
    renderWithRouter(<App />);

    const detailsBtn = screen.getByRole('link', { name: 'More details' });
    userEvent.click(detailsBtn);

    const favoriteCheck = screen.getByRole('checkbox');
    userEvent.click(favoriteCheck);

    const favorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favorite);

    const star = screen.getByAltText('Pikachu sprite');
    expect(star).toBeInTheDocument();
  });
});
