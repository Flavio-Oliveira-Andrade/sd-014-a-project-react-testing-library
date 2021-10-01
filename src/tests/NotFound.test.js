import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../utils/renderWithRouter';

import NotFound from '../components/NotFound';

describe('Página NotFound', () => {
  test('renderiza um heading e uma imagem', () => {
    renderWithRouter(<NotFound />);

    const heading = screen.getByRole('heading',
      { level: 2, name: /page requested not found/i });
    expect(heading).toBeInTheDocument();

    const image = screen.getByRole('img', { name: /Pikachu crying/i });
    const expectedImageURL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(expectedImageURL);
  });
});
