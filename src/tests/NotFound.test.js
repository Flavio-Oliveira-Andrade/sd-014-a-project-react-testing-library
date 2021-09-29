import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente "MotFound"', () => {
  test('verifica se a informações estão na tela', () => {
    const { history } = renderWithRouter(<App />);
    history.push('xablau');
    const alt = 'Pikachu crying because the page requested was not found';
    const notFoundText = screen.getByText(/Page requested not found/i);
    expect(notFoundText).toBeInTheDocument();
    const notFoundImage = screen.getByAltText(alt);
    expect(notFoundImage.src).toBe('https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
