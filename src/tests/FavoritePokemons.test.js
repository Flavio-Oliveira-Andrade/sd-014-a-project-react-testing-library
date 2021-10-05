import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import FavoritePokemons from '../components/FavoritePokemons';

describe('Teste da página FavoritePokemons', () => {
  test('Verifica se há a mensagem No Favorite Pokemons', () => {
    render(<FavoritePokemons />, { wrapper: BrowserRouter });

    const notFoundMSG = screen.getByText(/no favorite pokemon found/i);

    expect(notFoundMSG).toBeInTheDocument();
  });
});
