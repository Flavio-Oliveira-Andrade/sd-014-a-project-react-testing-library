import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './helper/renderWithRouter';

describe('Componente Not Found', () => {
  it('Contém um heading h2 com o texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);
    const h2 = screen.getByRole('heading',
      {
        name: /Page requested not found/,
        level: 2,
      });
    expect(h2).toBeInTheDocument();
  });

  it('Página mostra a imagem "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif."', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getByAltText(/pikachu crying/i);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
