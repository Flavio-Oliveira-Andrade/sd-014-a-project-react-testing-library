import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from '../utils/renderWithRouter';

describe('Testes About.js', () => {
  test('Teste se página tem um heading h2 com o texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);

    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });

    expect(notFoundText).toBeInTheDocument();
  });

  test('Teste se página mostra uma imagem de notFound', () => {
    renderWithRouter(<NotFound />);

    const IMG_ALT = 'Pikachu crying because the page requested was not found';

    const notFoundImage = screen.getByAltText(IMG_ALT);

    expect(notFoundImage.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
