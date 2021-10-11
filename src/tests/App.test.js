// test('', () => {});
import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('1- Teste App.js', () => {
  test('Teste se Home, About e Favorite Pokémons renderizam na tela', () => {
    renderWithRouter(<App />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Favorite Pokémons')).toBeInTheDocument();
  });
});
