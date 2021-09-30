import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import NotFound from '../components/NotFound';

describe('4. Teste o componente <NotFound.js />:', () => {
  afterEach(() => {
    cleanup();
  });

  it('4.1. se página contém um heading h2 com o texto Page requested not found 😭',
    () => {
      renderWithRouter(<NotFound />);
      const text = screen.getByText(/Page requested not found/i);
      expect(text).toBeInTheDocument();
    });

  it('4.2. se página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif',
    () => {
      const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';

      renderWithRouter(<NotFound />);
      const img = screen.getByAltText(/Pikachu/i);
      expect(img.src).toBe(URL);
    });
});
