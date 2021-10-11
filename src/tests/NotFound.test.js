import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../components';

describe('Testa o component Not Found', () => {
  test('este se página contém um heading com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const notFound = screen.getByRole('heading',
      { level: 2, name: /Page requested not found/i });
    expect(notFound).toBeInTheDocument();
  });
  test('Teste se página mostra a imagem ', () => {
    renderWithRouter(<NotFound />);
    const image = screen.getByRole('img', { name: /requested was not found/i }).src;
    expect(image).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
