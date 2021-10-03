import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('testa mensagem de erro NotFound', () => {
  it('testa heading com o texto "Page requested not found"', () => {
    render(<NotFound />);

    const errorMessage = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });

    expect(errorMessage).toBeInTheDocument();
  });

  it('testa a imagem ', () => {
    render(<NotFound />);

    const imgErrorMessage = screen
      .getByAltText(/Pikachu crying because the page requested was not found/i);

    expect(imgErrorMessage).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
