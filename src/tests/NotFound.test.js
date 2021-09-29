import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testa se página NotFound: ', () => {
  it('renderiza um h2 com o texto "Page requested not found 😭"', () => {
    render(<NotFound />);

    const heading = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });

    expect(heading).toBeInTheDocument();
  });

  it('renderiza uma mensagem com a url providenciada', () => {
    render(<NotFound />);
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    const img = screen.getByRole('img', { name: /pikachu crying/i });

    expect(img).toHaveAttribute('src', url);
  });
});
