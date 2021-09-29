import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import RenderWithRouter from '../RenderWithRouter';

describe('Testes para o NotFound.js', () => {
  test('Testa se existe um h2 com o texto', () => {
    const { history } = RenderWithRouter(<App />);
    history.push('/pagina-que-nao-existe');
    const notFound = screen.getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji',
    });
    expect(notFound).toBeInTheDocument();
  });

  test('Testa se a página contém um Gif do Pikachu', () => {
    const { history } = RenderWithRouter(<App />);
    history.push('/pagina-que-nao-existe');
    const gif = screen.getByAltText('Pikachu crying because '
    + 'the page requested was not found');
    expect(gif.src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(gif).toBeInTheDocument();
  });
});
