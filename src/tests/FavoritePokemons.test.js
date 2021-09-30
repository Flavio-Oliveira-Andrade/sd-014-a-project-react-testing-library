import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';

describe('3. este o componente <FavoritePokemons.js />:', () => {
  afterEach(() => {
    cleanup();
  });

  it('3.1. se é exibido na tela a mensagem No favorite pokemon'
  + 'found, se a pessoa não tiver pokémons favoritos',
  () => {
    renderWithRouter(<FavoritePokemons />);
    const text = screen.getByText(/no favorite pokemon found/i);
    expect(text).toBeInTheDocument();
  });

  it('3.1. se é exibido na tela a mensagem No favorite pokemon'
  + 'found, se a pessoa não tiver pokémons favoritos',
  () => {
    renderWithRouter(<App />);

    const moreDetailsBtn = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsBtn);

    const checkBox = screen.getByRole('checkbox');
    userEvent.click(checkBox);

    const favoriteLink = screen.getByRole('link',
      { name: /favorite pokémons/i });
    userEvent.click(favoriteLink);

    const averageText = screen.getByText(/average/i);
    expect(averageText).toBeInTheDocument();
  });
});
