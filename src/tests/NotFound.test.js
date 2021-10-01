import React from 'react';
import { render, screen } from '@testing-library/react';
import renderwithRouter from '../utils/renderWithRouter';

import NotFound from '../components/NotFound';

describe('Testa o componente NotFound', () => {
  it('Teste se página contém um heading `h2`'
  + 'com o texto `Page requested not found 😭`', () => {
    render(<NotFound />);
    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i, // o emoticon não é encontrado e mesmo sem ele e com aspas o teste falhou
    });
    expect(notFoundText).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem'
  + ' `https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif`.', () => {
    render(<NotFound />);
    const image = screen.getByAltText(/Pikachu crying because/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
