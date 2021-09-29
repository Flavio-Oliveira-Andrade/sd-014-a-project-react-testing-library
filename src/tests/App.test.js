import React from 'react';
import App from '../App';

import renderWithRouter from './renderWithRouter';

describe('Teste no componente <App.js />', () => {
  it('Teste se o link "Home" redireciona para a rota "/".', () => {
    const { screen } = renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
  });

  it('Teste se o link "About" redireciona para a rota "/about".', () => {
    const { screen } = renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
  });

  it('Teste se o link "Favorite Pokémons" redireciona para a rota "/".', () => {
    const { screen } = renderWithRouter(<App />);

    const favotitePokemonsLink = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favotitePokemonsLink).toBeInTheDocument();
  });
});
