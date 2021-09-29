import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import { FavoritePokemons } from '../components';
import App from '../App';

const PIKACHU_DETAILS = '/pokemons/25';
const DRAGONAIR_DETAILS = '/pokemons/148';

describe('Testa o componente <FavoritePokemons.js />', () => {
  test('Sem pokémons favoritos, exibir mensagem "No favorite pokemon found', () => {
    renderWithRouter(<FavoritePokemons />);
    const message = screen.getByText('No favorite pokemon found');
    expect(message).toBeInTheDocument();
  });

  test('Testa se é exibido todos os cards de pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);

    history.push(PIKACHU_DETAILS);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    userEvent.click(screen.getByRole('checkbox'));

    history.push(DRAGONAIR_DETAILS);
    expect(screen.getByText('Dragonair')).toBeInTheDocument();
    userEvent.click(screen.getByRole('checkbox'));

    userEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Dragonair')).toBeInTheDocument();
  });
});
