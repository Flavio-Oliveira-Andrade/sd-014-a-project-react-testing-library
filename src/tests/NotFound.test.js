// test('', () => {});
import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';

import { NotFound } from '../components';

describe('Teste o componente <NotFound.js />', () => {
  test('Teste se página contém um h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);

    const notFound = screen.getByText(/Page requested not found/i);
    expect(notFound).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);

    const img = screen.getByAltText(/page requested was not found/i);
    expect(img).toBeInTheDocument();
  });
});
