import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import Favorites from '../components/FavoritePokemons';
import App from '../App';

describe('Testes do componente FavoritePokemon', () => {
  it(`Testanto se a mensagem exibida na tela é
  "No favorite pokemon found", se a pessoa nao tiver pokémons favoritos`, () => {
    render(<Favorites />);
    const msgNoFavorite = screen.getByText('No favorite pokemon found');
    expect(msgNoFavorite).toBeInTheDocument();
  });

  it('Testando se é exibido todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const moreDetails = screen.getByRole('link', {
      name: /more details/i,
    });
    userEvent.click(moreDetails);

    const labelFavorite = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });
    userEvent.click(labelFavorite);

    history.push('/favorites');

    const namePokemon = screen.getByText('Pikachu');
    expect(namePokemon).toBeInTheDocument();
  });
});
