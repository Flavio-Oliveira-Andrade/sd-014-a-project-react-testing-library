import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Verifica o componente <NotFound.js />', () => {
  it('Verifica se página contém um heading h2 '
  + 'com o texto Page requested not found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('chico');
    const notFoundTitle = screen.getByRole('heading', {
      level: 2, name: /Page requested not found/i,
    });
    expect(notFoundTitle).toBeInTheDocument();
  });

  it('Verifica se página mostra a imagem '
    + 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('tubico');
    const notFoundImg = screen.getByAltText('Pikachu crying because'
      + ' the page requested was not found');
    expect(notFoundImg.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
