import React from 'react';
import { screen, render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('4. Teste o componente `<NotFound.js />`', () => {
  test('Teste se página contém um heading com o texto'
    + '`Page requested not found`', () => {
    render(<NotFound />);
    expect(screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    }))
      .toBeInTheDocument();
  });

  test('Teste se página mostra a imagem', () => {
    render(<NotFound />);
    const imageAlt = 'Pikachu crying because the page requested was not found';
    expect(screen.getByAltText(imageAlt))
      .toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
