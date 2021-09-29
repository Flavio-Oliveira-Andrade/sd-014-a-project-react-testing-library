import React from 'react';
import NotFound from '../components/NotFound';

import renderWithRouter from './renderWithRouter';

describe('Teste o componente <NotFound.js />', () => {
  it('Teste se página contém h2 com o texto: "Page requested not found".', () => {
    const { screen } = renderWithRouter(<NotFound />, { route: '/nao-tem-esta-pagina' });

    const h2 = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(h2).toBeInTheDocument();
  });

  it('Teste se a página contém a imagem de gif do Pikachu', () => {
    const { screen } = renderWithRouter(<NotFound />, { route: '/nao-tem-esta-pagina' });

    const imgPokedex = screen.getByRole('img', {
      name: 'Pikachu crying because the page requested was not found' });
    expect(imgPokedex.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
