import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('NotFound.js Testes', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina-inexistente/');
  });
  it('Teste se pg contém um heading h2 com o txt Page requested not found 😭', () => {
    expect((screen.getByText('Page requested not found'))).toBeInTheDocument();
  });
  it('Teste se página mostra a imagem', () => {
    expect((screen.getByRole('img', { name: /Pikachu crying because/i })).src).toContain('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
