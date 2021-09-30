import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from '../utilities/renderWithRouter';

describe('Testa o componente "NotFound"', () => {
  it('testa se tem um tilulo com a frase "Page requested not found"', () => {
    renderWithRouter(<NotFound />);
    const isH2 = screen.getByRole('heading', {
      name: /Page requested not found/i,
    });
    expect(isH2).toBeInTheDocument();
  });
  it('testa se tem uma imagem na tela', () => {
    renderWithRouter(<NotFound />);
    const IMAGE_URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    // aqui como tem mais de uma imagem, pegamos a segunda.
    const { src } = screen.getAllByRole('img')[1];

    expect(src).toBe(IMAGE_URL);
  });
});
