import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './util/renderWithRouter';

describe('Teste do componente <FavoritePokemons.js />', () => {
  it('Verifique se é exibido na tela a mensagem "No favorite pokemon found",'
  + ' se a pessoa não tiver pokémons favoritos.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
    const emptyFavoritesText = screen.getByText(/No favorite pokemon found/i);
    expect(emptyFavoritesText).toBeInTheDocument();
  });
  it('Verifique se é exibido todos os cards de pokémons favoritados.', async () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pokemons/25');
    const favoriteCheckbox = screen.getByRole('checkbox');
    userEvent.click(favoriteCheckbox);
    history.push('/favorites');
    const cardMoreDetailsText = screen.getAllByRole('link', { name: /more details/i });
    expect(cardMoreDetailsText).toHaveLength(1);
  });
});
