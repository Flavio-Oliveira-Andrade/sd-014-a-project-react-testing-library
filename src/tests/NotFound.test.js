import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from '../renderWithRouter';

const imgNotFound = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

describe('Testa o componente NotFound', () => {
  test('Verifica se página contém um  h2 com o texto Page requested not found ', () => {
    renderWithRouter(<NotFound />);
    const titulo = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found /i,
    });
    expect(titulo).toBeInTheDocument();
  });
  test('Verifica  se existe imagem de erro', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getByRole('img', {
      name: /Pikachu crying because the page/i,
    });
    expect(img.src).toBe(imgNotFound);
  });
});
