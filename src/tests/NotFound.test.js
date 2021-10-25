import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';

describe('Testa o componente <NotFound.js />', () => {
  test('Teste se página contém um heading h2'
  + ' com o texto Page requested not found', () => {
    render(<NotFound />);
    const message = screen.getByRole('heading', {
      name: /page requested not found/i,
    });
    expect(message).toBeInTheDocument();
  });

  test('Teste se página mostra o gif do pikachu.', () => {
    render(<NotFound />);
    const img = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const gif = screen.getByAltText(/pikachu crying/i);
    expect(gif.src).toStrictEqual(img);
  });
});
