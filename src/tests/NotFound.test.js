import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../render/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa se aplicação é renderizada para o componente NotFound', () => {
  test('Se página contém um heading h2 com o texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);
    const textPageRequestNotFoundH2 = screen.getByRole('heading',
      {
        name: /Page requested not found/i,
        level: 2,
      });
    expect(textPageRequestNotFoundH2).toBeInTheDocument();
  });

  test('Se página mostra a imagem', () => {
    renderWithRouter(<NotFound />);
    const mostraImagem = screen.getByRole('img',
      {
        name: 'Pikachu crying because the page requested was not found',
      });
    expect(mostraImagem.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
