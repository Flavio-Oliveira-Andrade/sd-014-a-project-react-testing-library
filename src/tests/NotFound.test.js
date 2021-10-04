import React from 'react';
import { screen, render } from '@testing-library/react';
import { NotFound } from '../components';

describe('Testa o se o componente Not Found renderiza', () => {
  it('Verifica se apresenta o h2 com texto "Page requested not found"', () => {
    render(<NotFound />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('Verifica se a pagina Not Found mostra a imagem do pikachu', () => {
    render(<NotFound />);
    const image = screen.getByAltText(/pikachu crying/i);
    const imgUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', imgUrl);
  });
});
