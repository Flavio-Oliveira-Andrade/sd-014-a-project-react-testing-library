// test('', () => {});
import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import NotFound from '../components/NotFound';

describe('4- Teste NotFound.js', () => {
  beforeEach(() => { renderWithRouter(<NotFound />); });

  test('Teste se a página possui um Header h2 renderizando', () => {
    expect(screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    })).toBeInTheDocument();
  });

  test('Teste se a página renderiza um gif do pikachu chorando', () => {
    const notFoundImage = screen
      .getByAltText('Pikachu crying because the page requested was not found');

    expect(notFoundImage.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
