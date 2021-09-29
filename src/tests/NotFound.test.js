import React from 'react';
import { screen, render } from '@testing-library/react';
import NotFound from '../components/NotFound';

const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

describe('Teste o componente <NotFound.js />', () => {
  it('se página contém um heading h2 com o texto Page requested not found 😭', () => {
    render(<NotFound />);
    expect(screen.getByRole('heading', {
      name: /page requested not found/i,
    })).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem requerida', () => {
    render(<NotFound />);
    expect(screen.getByRole('img', {
      name: /pikachu crying because/i,
    })).toHaveAttribute('src', URL);
  });
});
