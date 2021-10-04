import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

describe('testa componente FavoritePokemons', () => {
  test(
    'é exibido na tela "No favorite pokemon found", sem pokémons favoritos', () => {
      render(<FavoritePokemons />, { wrapper: BrowserRouter });

      const favorite = screen.getByText(/No favorite pokemon found/i, { selector: 'p' });
      expect(favorite).toBeInTheDocument();
    },
  );
  test(
    'testa se é exibido todos os cards de pokémons favoritados', () => {
      renderWithRouter(<App pokemons={ [pokemons[0]] } />);

      expect(screen.getByText(/Pikachu/i)).toBeInTheDocument();
    },
  );
});

// Exercício realizado com a ajuda do código do colega Ilan Aragão: https://github.com/tryber/sd-014-a-project-react-testing-library/pull/106/commits/15649ff05424b1a27b0c1a7eb266c4864db659bb
