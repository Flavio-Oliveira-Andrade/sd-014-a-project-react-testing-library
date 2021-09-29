import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente "FavoritesPokemons"', () => {
  test('Teste se é exibido na tela a mensagem "No favorite pokemon found"', () => {
    renderWithRouter(<FavoritePokemons />);
    const heading = screen.getByRole('heading', { name: 'Favorite pokémons' });
    expect(heading).toBeInTheDocument();
    const notFound = screen.getByText('No favorite pokemon found');
    expect(notFound).toBeInTheDocument();
  });
  test('Teste se é exibido todos os cards de pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText('More details'));
    userEvent.click(screen.getByText('Pokémon favoritado?'));
    history.push('/favorites');
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent('Electric');
    expect(screen.getByTestId('pokemon-weight'))
      .toHaveTextContent('Average weight: 6.0 kg');
    expect(screen.getByText('More details')).toBeInTheDocument();
  });
});
