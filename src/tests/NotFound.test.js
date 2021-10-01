import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Testa o componente NotFound', () => {
  test('A página contém um h2 com o texto Page requested not found', () => {
    render(<NotFound />);
    const heading2 = screen.getByRole('heading');
    expect(heading2).toBeInTheDocument();
    const heading2text = screen.getByText(/Page requested not found/i);
    expect(heading2text).toBeInTheDocument();
  });

  test('A página contém o gif https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    render(<NotFound />);
    const gif = screen.getByAltText(/Pikachu crying/i);
    expect(gif).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
