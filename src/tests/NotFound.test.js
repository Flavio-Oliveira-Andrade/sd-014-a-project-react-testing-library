import React from 'react';
import { screen, render } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testa o componente NotFound', () => {
  it('Teste se página contém um heading h2 com o'
   + ' texto Page requested not found 😭', () => {
    render(<NotFound />);
    const head2 = screen.getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    });
    expect(head2).toBeInTheDocument();
  });

  it('Teste se página mostra uma imagem', () => {
    render(<NotFound />);
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const alt = screen.getByAltText('Pikachu crying because'
    + ' the page requested was not found');
    expect(alt).toHaveAttribute('src', url);
  });
});
