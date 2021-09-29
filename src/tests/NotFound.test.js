import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Testa o componente NotFound', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina/que-nao-existe/');
  });
  it('Teste se página contém um heading h2 com o texto Page requested not found', () => {
    const noMatch = screen.getByText(/Page requested not found/i);
    expect(noMatch).toBeInTheDocument();
  });

  it('Teste se página mostra a imagem', () => {
    const img = screen.getByRole('img', { name: /Pikachu crying because/i });
    expect(img.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
    expect(img).toBeInTheDocument();
  });
});
