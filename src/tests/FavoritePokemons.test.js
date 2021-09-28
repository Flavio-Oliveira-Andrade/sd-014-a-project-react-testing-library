import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';

describe('Teste o componente <FavoritePokemons.js />', () => {
  test('Teste se é exibido na tela a mensagem No favorite pokemon found,'
  + ' se a pessoa não tiver pokémons favoritos', () => {
    renderWithRouter(<FavoritePokemons />);
    const textNotFound = screen.getByText('No favorite pokemon found');
    expect(textNotFound).toBeInTheDocument();
  });
  test('Teste se é exibido todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', {
      name: 'More details',
    });
    userEvent.click(linkDetails);
    const { pathname } = history.location;
    expect(pathname).not.toBe('/');
    const inputFavorite = screen.getByRole('checkbox');
    userEvent.click(inputFavorite);
    history.push('/favorites');
    const pikachuText = screen.getByText('Pikachu');
    expect(pikachuText).toBeInTheDocument();
  });
});
