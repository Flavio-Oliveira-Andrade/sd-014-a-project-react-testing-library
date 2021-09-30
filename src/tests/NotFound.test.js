import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import NotFound from '../components/NotFound';

describe('Teste da página NotFound', () => {
  test('Verifica se há o texto NotFound', () => {
    render(<NotFound />, { wrapper: BrowserRouter });

    const title = screen.getByRole('heading', { name: /Page requested not found/i });

    expect(title).toBeInTheDocument();
  });
  test('Verifica se a imagem está correta', () => {
    render(<NotFound />, { wrapper: BrowserRouter });

    const img = screen.getByRole('img', {
      name: /pikachu crying because the page requested was not found/i });
    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

    expect(img).toHaveAttribute('src', url);
  });
});
