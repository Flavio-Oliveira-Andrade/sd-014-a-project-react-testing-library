import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Teste o componente <NotFound.js />', () => {
  renderWithRouter(<NotFound />);
  test('este se página contém um heading h2 com o texto Page requested not found', () => {
    const h2 = screen.getByRole('heading', {
      name: /Page requested not foun/i,
      level: 2,
    });
    expect(h2).toBeInTheDocument();
  });
  test('Teste se página mostra a imagem', () => {
    const notFoundImg = screen.getByAltText(/pikachu crying/i);
    expect(notFoundImg).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
