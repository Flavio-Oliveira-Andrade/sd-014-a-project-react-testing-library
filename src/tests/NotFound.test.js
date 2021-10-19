import { screen } from '@testing-library/react';
import React from 'react';
import { NotFound } from '../components';
import renderWithRouter from '../rendreWithRouter';

const src = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
const altImg = 'Pikachu crying because the page requested was not found';

describe('Teste o componente NotFound.js', () => {
  it('testa se contém um heading h2 com o texto "Page requested not found"', () => {
    renderWithRouter(<NotFound />);

    const heading = screen.getByRole('heading', {
      name: /Page requested not found/i, level: 2 });
    expect(heading).toBeInTheDocument();
  });

  it('testa se a pagina mostra uma imagem', () => {
    renderWithRouter(<NotFound />);

    const img = screen.getByAltText(altImg);
    expect(img.src).toContain(src);
  });
});
