import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter.test';

import NotFound from '../components/NotFound';

describe('04-Teste o componente "NotFound.js"', () => {
  test('se página contém um heading h2 com o texto Page requested not found ', () => {
    renderWithRouter(<NotFound />);
    const notFoundTxt = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(notFoundTxt).toBeInTheDocument();
  });

  test('se a página contém uma imagem', () => {
    renderWithRouter(<NotFound />);
    const notFoundImg = screen.getAllByRole('img');
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const alt = 'Pikachu crying because the page requested was not found';
    expect(notFoundImg[1].src).toBe(src, alt);
  });
});
