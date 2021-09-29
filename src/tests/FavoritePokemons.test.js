import React from 'react';
import { render, screen } from '@testing-library/react';

import FavoritePokemons from '../components/FavoritePokemons';

describe(' Testes FavoritePokemons.', () => {
  test('Sem favoritos', () => {
    render(<FavoritePokemons />);
    if (FavoritePokemons.length === 0) {
      const paragrafo = screen.getByText(/No favorite pokemon found/);
      expect(paragrafo).toBeInTheDocument();
    }
  });
});
