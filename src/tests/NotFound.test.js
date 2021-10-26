import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithReactRouter from './renderWithReactRouter';

describe('Componente Not Found', () => {
  it('Teste se página contém um heading h2 com o texto: Page requested not found', () => {
    renderWithReactRouter(<NotFound />);
    const h2 = screen.getByRole('heading',
      {
        name: /Page requested not found/,
        level: 2,
      });
    expect(h2).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif"', () => {
    renderWithReactRouter(<NotFound />);
    const img = screen.getByAltText(/pikachu crying/i);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
