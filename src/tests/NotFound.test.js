import React from 'react';
import { render, screen } from '@testing-library/react';

import NotFound from '../components/NotFound';

describe('Requisito 4, testa o NotFound.js', () => {
  it('Testa se pág contém um heading h2 com o texto Page requested not found.', () => {
    render(<NotFound />);
    const notFound = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });

    expect(notFound).toBeInTheDocument();
  });

  it('Testa se página mostra o gif do Pikachu chorando.', () => {
    render(<NotFound />);
    const notFoundImg = screen.getByAltText(
      /Pikachu crying because the page requested was not found/i,
    );
    expect(notFoundImg).toBeInTheDocument();
    expect(notFoundImg).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
