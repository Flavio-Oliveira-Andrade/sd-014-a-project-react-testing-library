import { screen } from '@testing-library/react';
import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from '../services/renderWithRouter';

describe('Testa o componente NotFound.js', () => {
  it('Deveria conter o texto "Page requested not found" em um h2', () => {
    renderWithRouter(<NotFound />);
    const h2 = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(h2).toBeInTheDocument();
  });
  it('Deveria mostrar a imagem do Pikachu chorando 😭😭😭', () => {
    renderWithRouter(<NotFound />);
    const gif = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    const gifSource = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(gif.src).toBe(gifSource);
  });
});
