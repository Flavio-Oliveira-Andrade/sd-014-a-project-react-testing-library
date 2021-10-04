import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Teste o componente `<NotFound.js />`', () => {
  it('contém um heading `h2` com o texto `Page requested not found`', () => {
    render(<NotFound />);

    const h2NotFound = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });

    expect(h2NotFound).toBeInTheDocument();
  });
  it('Teste se página mostra a imagem "gif"', () => {
    render(<NotFound />);

    const img = screen.getByAltText(/Pikachu crying because/i);

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
