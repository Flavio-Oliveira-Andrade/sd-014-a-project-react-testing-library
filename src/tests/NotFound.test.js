import React from 'react';
import { screen } from '@testing-library/react';

import renderWithRouter from './utils/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  test('Teste se página contém um heading h2 com o texto'
    + 'Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);

    const headingText = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });
    expect(headingText).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);
    const IMG_SRC = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const pokedexImg = screen.getByAltText(/Pikachu crying/);
    expect(pokedexImg).toHaveAttribute('src', IMG_SRC);
    expect(pokedexImg).toBeInTheDocument();
  });
});
