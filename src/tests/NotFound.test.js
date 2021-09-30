import React from 'react';
import { render, screen } from '@testing-library/react';
import { NotFound } from '../components';

describe('Teste o componente "NotFound"', () => {
  test('Teste a página apresenta heading h2 com o texto Page requested not found', () => {
    render(<NotFound />);

    const h2Text = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(h2Text).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem '
  + ' https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    render(<NotFound />);

    const img = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    const imgPikachuCry = screen.getByAltText(/crying/);
    expect(imgPikachuCry.src).toStrictEqual(img);
  });
});
