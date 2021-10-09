import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './render/renderWithRouter';

import NotFound from '../components/NotFound';

describe('Testes do requisito 4', () => {
  it('se página contém um heading h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    expect(
      screen.getByRole('heading', { name: /page requested not found/i }),
    ).toBeInTheDocument();
  });

  it('se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);
    expect(
      screen.getByAltText(
        'Pikachu crying because the page requested was not found',
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByAltText(
        'Pikachu crying because the page requested was not found',
      ),
    ).toHaveAttribute(
      'src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    );
  });
});
