import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/RenderWithRouter';
import { NotFound } from '../components';

describe('Testa o componente <About.js/>', () => {
  test('Testa se página contém um heading com o texto Page requested not found', () => {
    renderWithRouter(<NotFound />);
    const text = screen.getByRole('heading', { name: /requested not found/i });
    expect(text).toBeInTheDocument();
  });
  test('Testa se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    renderWithRouter(<NotFound />);
    const imag = screen.getByRole('img', { name: /the page requested was not found/i }).src;
    expect(imag).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
