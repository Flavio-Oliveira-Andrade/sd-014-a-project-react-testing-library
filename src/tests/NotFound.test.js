import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

// Requisito 4
test('testa se página contém um heading h2 com o texto Page requested not found', () => {
  render(<NotFound />);

  const textNotFound = screen.getByRole('heading', {
    level: 2,
    name: /Page requested not found/i,
  });
  expect(textNotFound).toBeInTheDocument();
});

// Requisito 4
test('testa se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
  render(<NotFound />);

  const imgNotFound = screen.getByRole('img', {
    name: 'Pikachu crying because the page requested was not found',
  });
  expect(imgNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
});
