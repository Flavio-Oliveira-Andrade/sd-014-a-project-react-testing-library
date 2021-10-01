import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../utils/RenderWithRoute';

import { NotFound } from '../components';

const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

describe('NotFound.js test', () => {
  test('Testa se página contém um heading h2'
   + 'com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);
    const notFoundText = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });
    expect(notFoundText).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem definida como URL', () => {
    renderWithRouter(<NotFound />);
    const pikachuIMG = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i,
    });
    expect(pikachuIMG).toHaveAttribute('src', URL);
  });
});
