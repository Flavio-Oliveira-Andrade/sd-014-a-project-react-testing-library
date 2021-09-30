import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testa o componente <NotFound.js />', () => {
  it('Teste se página contém um heading h2 com o texto Page requested not found.', () => {
    render(<NotFound />);

    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(notFoundText).toBeInTheDocument();
  });

  it('Testa se página mostra a imagem do Pikachu chorando.', () => {
    render(<NotFound />);

    const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const notFoundImg = screen.getByAltText(
      'Pikachu crying because the page requested was not found',
    );

    expect(notFoundImg).toBeInTheDocument();
    expect(notFoundImg.src).toContain(URL);
  });
});
