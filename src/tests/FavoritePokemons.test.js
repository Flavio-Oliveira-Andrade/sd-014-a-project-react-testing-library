import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { FavoritePokemons } from '../components';

describe('Requisito 3 Favorite Pokemons', () => {
  it('Deve ser exibido na tela a mensagem No favorite pokemon foun', () => {
    renderWithRouter(<FavoritePokemons />);
    const textNotFound = screen.getByText('No favorite pokemon found');
    expect(textNotFound).toBeInTheDocument();
  });
  it('Deve aparecer todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByRole('link', {
      name: 'More details',
    });
    userEvent.click(details);
    const { pathname } = history.location;
    expect(pathname).not.toBe('/');
    const favorite = screen.getByRole('checkbox');
    userEvent.click(favorite);
    history.push('/favorites');
    const pokemon = screen.getByText('Pikachu');
    expect(pokemon).toBeInTheDocument();
  });
});
