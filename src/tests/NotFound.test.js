import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { NotFound } from '../components';

describe('Testes do requisito 4', () => {
  it('Testa se página contém h2 com o texto "Page requested not found 😭"', () => {
    renderWithRouter(<NotFound />);
    const notFound = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/,
    });
    expect(notFound).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    const img = screen.getByRole('img', {
      name: 'Pikachu crying because the page requested was not found',
    });
    expect(img).toBeInTheDocument();
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
