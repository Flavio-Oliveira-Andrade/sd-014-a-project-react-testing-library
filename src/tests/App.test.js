import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import RenderWithRouter from '../RenderWithRouter';

describe('Testes para o app.js', () => {
  test('Primeiro link deve possuir texto Home', () => {
    RenderWithRouter(<App />);
    const homeLink = screen.getByText('Home');
    expect(homeLink).toBeInTheDocument();
  });

  test('Segundo link deve possuir texto About', () => {
    RenderWithRouter(<App />);
    const aboutLink = screen.getByText('About');
    expect(aboutLink).toBeInTheDocument();
  });

  test('Terceiro link deve possuir texto Favorite Pokémons', () => {
    RenderWithRouter(<App />);
    const favPokeLink = screen.getByText('Favorite Pokémons');
    expect(favPokeLink).toBeInTheDocument();
  });
});
