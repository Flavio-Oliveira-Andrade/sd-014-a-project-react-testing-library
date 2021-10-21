import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helper/renderWithRouter';
import NotFound from '../components/NotFound';

describe('Testa página not found', () => {
  it('renderiza um h2', () => {
    renderWithRouter(<NotFound />);
    const notFoundMessage = screen.getByText(/Page requested not found/i);

    expect(notFoundMessage).toBeInTheDocument();
  });
  it('renderiza uma imagem', () => {
    renderWithRouter(<NotFound />);
    const urlImage = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const pikachuImg = screen.getAllByRole('img');

    expect(pikachuImg[1].src).toBe(urlImage);
  });
});
