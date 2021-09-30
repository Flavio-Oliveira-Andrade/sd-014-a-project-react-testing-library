import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';

describe('Testa o componente <NotFound.js />', () => {
  it('Teste se página contém um heading h2'
  + ' com o texto Page requested not found', () => {
    render(<NotFound />);
    const notFoundMessage = screen.getByRole('heading', {
      name: /Page requested not found/i,
    });
    expect(notFoundMessage).toBeInTheDocument();
  });

  it('Teste se página mostra o gif do pikachu.', () => {
    render(<NotFound />);
    const imgUrl = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const pikachuGif = screen.getByAltText(/Pikachu crying/i);
    expect(pikachuGif.src).toStrictEqual(imgUrl);
  });
});
