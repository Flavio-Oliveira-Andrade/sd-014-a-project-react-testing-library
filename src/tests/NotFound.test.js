import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import { NotFound } from '../components';

describe('NotFound.js test', () => {
  test('Test se página contém um heading h2 com o texto Page requested not found', () => {
    render(<MemoryRouter><NotFound /></MemoryRouter>);

    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(notFoundText).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem', () => {
    render(<MemoryRouter><NotFound /></MemoryRouter>);
    const img = screen.getByAltText(/pikachu/i);
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src',
      'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
