import { screen, render } from '@testing-library/react';
import React from 'react';
import { NotFound } from '../components';

describe('testa componente "NotFound"', () => {
  test('página contém um heading h2 com o texto Page requested not found 😭', () => {
    render(<NotFound />);

    const heading = screen
      .getByRole('heading', { name: /Page requested not found/i, level: 2 });

    expect(heading).toBeInTheDocument();
  });

  test('página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    render(<NotFound />);

    const img = screen
      .getByRole('img',
        { name: /Pikachu crying because the page requested was not found/i });

    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
