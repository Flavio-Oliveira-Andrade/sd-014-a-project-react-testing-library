import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';

describe('Testa o componente NotFound.js', () => {
  test('Testa se página contém um heading h2 com o texto Page requested not found',
    () => {
      render(<NotFound />);
      const notFoundHeading = screen.getByRole('heading', {
        level: 2,
        name: /Page requested not found/i,
      });
      expect(notFoundHeading).toBeInTheDocument();
    });

  test('Testa se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    render(<NotFound />);
    const notFoundImg = screen
      .getByAltText(/Pikachu crying because the page requested was not found/i);
    expect(notFoundImg.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
