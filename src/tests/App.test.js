import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../utils/renderWithRouter';

describe('Componente App', () => {
  test('renderiza links de navegação', () => {
    renderWithRouter(<App />);
    const navLinks = screen.getAllByRole('link');
    expect(navLinks[0].innerHTML).toBe('Home');
    expect(navLinks[1].innerHTML).toBe('About');
    expect(navLinks[2].innerHTML).toBe('Favorite Pokémons');
  });
});
