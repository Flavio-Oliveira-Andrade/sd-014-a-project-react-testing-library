import React from 'react';
import { screen } from '@testing-library/react';

import renderWithRouter from './utils/renderWithRouter';
import { NotFound } from '../components';

describe('Testa o componente NotFound', () => {
  test('Testa se página contém um h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);

    const pageNotFound = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(pageNotFound).toBeInTheDocument();
  });
  test('Testa se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);

    const imgNotFound = screen.getAllByRole('img');
    const pikacuCrying = imgNotFound[1];
    expect(pikacuCrying).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(pikacuCrying).toHaveAttribute(
      'alt', 'Pikachu crying because the page requested was not found',
    );
  });
});
