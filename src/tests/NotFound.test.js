import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../utils/renderWithRouter';
import { NotFound } from '../components';

describe('Testando o componente NotFound', () => {
  it('Teste se página contém um heading h2'
  + ' com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);
    const heading = screen.getByRole('heading', { level: 2,
      name: /Page requested not found/i });
    expect(heading).toBeInTheDocument();
  });
  it('Teste se página mostra a imagem com o url correta', () => {
    renderWithRouter(<NotFound />);
    const alt = 'Pikachu crying because the page requested was not found';
    const img = screen.getByAltText(alt);
    const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    console.log(img.src);
    expect(img.src).toBe(src);
  });
});
