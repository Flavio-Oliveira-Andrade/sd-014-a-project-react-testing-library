import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Verifica o <App />', () => {
  test('Primeiro link deve ser "Home"', () => {
    renderWithRouter(<App />);

    const link1 = screen.getByRole('link', { name: 'Home' });

    expect(link1).toBeInTheDocument();
  });

  test('Segundo link deve ser "About"', () => {
    renderWithRouter(<App />);

    const link2 = screen.getByRole('link', { name: 'About' });

    expect(link2).toBeInTheDocument();
  });

  test('Terceiro link deve ser "Favorite Pokémons"', () => {
    renderWithRouter(<App />);

    const link3 = screen.getByRole('link', { name: 'Favorite Pokémons' });

    expect(link3).toBeInTheDocument();
  });
});
