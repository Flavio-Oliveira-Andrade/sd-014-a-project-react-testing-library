import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import renderWithRouter from '../renderWithRouter';
import NotFound from '../components/NotFound';

describe('Verifica o componente <NotFound />', () => {
  test('Mensagem de erro aparece na pagina Not Found', () => {
    renderWithRouter(<NotFound />);

    const notFoundMsg = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(notFoundMsg).toBeInTheDocument();
  });

  test('Imagem aparece na pagina Not Found', () => {
    renderWithRouter(<NotFound />);

    const notFoundImg = screen.getByAltText(/Pikachu crying/i);
    expect(notFoundImg.src).toEqual('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
