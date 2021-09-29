import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../utils/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa se o componente é renderizado corretamente', () => {
  it('Verifica se a página contém um h2 com o texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/,
    });

    expect(heading).toBeInTheDocument();
  });

  it('Verifica se o componente renderiza a imagem', () => {
    renderWithRouter(<NotFound />);

    const image = screen.getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });

    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
