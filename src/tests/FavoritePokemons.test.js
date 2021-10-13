import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Verifica o componente <FavoritePokemons.js />', () => {
  it('Verifica se é exibido na tela a mensagem No favorite pokemon found, '
   + 'se a pessoa não tiver pokémons favoritos.', () => {
    renderWithRouter(<FavoritePokemons />);
    const headingText = screen.getByRole('heading', {
      name: 'Favorite pokémons',
      level: 2,
    });
    expect(headingText).toBeInTheDocument();
    const notFoundText = screen.getByText('No favorite pokemon found');
    expect(notFoundText).toBeInTheDocument();
  });

  it('Verifica se é exibido todos os cards de pokémons favoritados.', () => {
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
