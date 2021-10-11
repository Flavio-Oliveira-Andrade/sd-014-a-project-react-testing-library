import React from 'react';
import { screen } from '@testing-library/react';
import NotFound from '../components/NotFound';
import renderWithRouter from './utils/renderWithRouter';

describe('Testes do componente <NotFound.js />', () => {
  test('se página contém um heading h2 com o texto Page requested not found 😭', () => {
    renderWithRouter(<NotFound />);
    expect(screen.getByText(/Page requested not found/)).toBeInTheDocument();
  });

  test('Se mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);
    expect(screen.getByAltText('Pikachu crying because the page requested was not found'))
      .toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
