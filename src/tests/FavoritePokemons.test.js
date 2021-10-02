import { render } from '@testing-library/react';
import React from 'react';
import FavoritePokemons from '../components/FavoritePokemons';

test('verify no favorites message', () => {
  render(<FavoritePokemons />);
});
