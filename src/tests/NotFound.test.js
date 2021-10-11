import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import NotFound from '../components/NotFound';

describe('NotFound.js test', () => {
  test('Teste se página contém um h2 com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const headingNotFound = screen.getByText(/Page requested not found/i);
    expect(headingNotFound).toBeInTheDocument();
  });
  test('Teste se página mostra a imagem requisitada', () => {
    renderWithRouter(<NotFound />);
    const imgNotFound = screen.getByRole('img', { name: /not found/i });
    expect(imgNotFound).toBeInTheDocument();
    expect(imgNotFound).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
