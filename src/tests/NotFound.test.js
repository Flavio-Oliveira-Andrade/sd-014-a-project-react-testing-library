import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testes do componente NotFound', () => {
  it(`Testando se página contém um heading h2 com o texto 
  "Page requested not found"`, () => {
    render(<NotFound />);
    const headingH2 = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/,
    });
    expect(headingH2).toBeInTheDocument();
  });

  it(`Testando se a página mostra o gif 
  "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif"`, () => {
    render(<NotFound />);
    const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = screen.getByAltText(/Pikachu/);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', URL);
  });
});
