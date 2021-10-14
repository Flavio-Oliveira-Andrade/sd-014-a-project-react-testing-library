import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../render/renderWithRouter';
import App from '../App';

describe('Testa se aplicação é renderizada para o componente App', () => {
  test('Se o link possui o texto Home', () => {
    renderWithRouter(<App />);
    const linkTextHome = screen.getByText('Home');
    expect(linkTextHome).toBeInTheDocument();
  });

  test('Se o link possui o texto About', () => {
    renderWithRouter(<App />);
    const linkTextAbout = screen.getByText('About');
    expect(linkTextAbout).toBeInTheDocument();
  });

  test('Se o link possui o texto Favorite Pokémons', () => {
    renderWithRouter(<App />);
    const linkTextFavoritePokemons = screen.getByText('Favorite Pokémons');
    expect(linkTextFavoritePokemons).toBeInTheDocument();
  });
});
