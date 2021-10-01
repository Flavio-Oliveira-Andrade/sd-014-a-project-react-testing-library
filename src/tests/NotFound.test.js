import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Elemento do componente <NotFound.js />', () => {
  it('A página contém 1 heading h2 com  texto "Page requested not found 😭"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/aqui-pode-ser-xablau');
    const textNotFound = screen.getByRole('heading',
      { name: /page requested not found/i, level: 2 });
    expect(textNotFound).toBeInTheDocument();
  });

  it('A página mostra a imagem https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/aqui-pode-ser-xablau');
    const imgNotFound = screen.getByRole('img',
      { name: /pikachu crying because the page requested was not found/i });
    expect(imgNotFound.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
