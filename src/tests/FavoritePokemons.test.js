import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FavoritePokemons } from '../components';
import { MemoryRouter } from 'react-router';
import App from '../App';

describe('Testa o funcionamento da pagina de favoritos', () => {
  test('Testa a pagina de favoritos quando nenhum pokemon é selecionado', () => {
    render(<FavoritePokemons />);
    const noFavorite = screen.getByText('No favorite pokemon found');
    expect(noFavorite).toBeInTheDocument();
  });

  test('Testa a pagina de favoritos quando há pokemon selecionados', () => {
    render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
    );

    const detailLink = screen.getByRole('link', {
      name: /more details/i,
    });
    expect(detailLink).toBeInTheDocument();
    userEvent.click(detailLink);

    const favoriteCheck = screen.getByRole('checkbox')
    expect(favoriteCheck).toBeInTheDocument();
    userEvent.click(favoriteCheck);

    const favoriteLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(favoriteLink).toBeInTheDocument();
    userEvent.click(favoriteLink);

    const pokeName = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemon-type');
    const pokeWeight = screen.getByTestId('pokemon-weight');

    expect(pokeName).toBeInTheDocument();
    expect(pokeType).toBeInTheDocument();
    expect(pokeWeight).toBeInTheDocument();


  });
});
