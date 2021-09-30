import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando o componente <NotFound.js />', () => {
  test('Verifca se página contém um texto "Page requested not found"', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/nao-existente');

    const texto = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(texto).toBeInTheDocument();
  });

  test('Teste se página mostra a imagem', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/nao-existente');

    const URL = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const img = screen.getByRole('img', {
      name: /Pikachu crying/i,
    });

    expect(img).toHaveAttribute('src', URL);
  });
});
