import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  test('Teste se página contém um heading e uma Imagem', () => {
    render(<NotFound />);
    const notFound = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    const img = screen
      .getByAltText(/Pikachu crying because the page requested was not found/i);

    expect(notFound).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
