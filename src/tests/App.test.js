import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './Util/RenderWithRouter';

describe('Teste App.test.js', () => {
  it('Verifica se o link possui o texto "Home" '
  + 'e redireciona para a página inicial', () => {
    const { history } = renderWithRouter(<App />);

    const homeText = screen.getByRole('link', {
      name: /home/i,
    });
    expect(homeText).toBeInTheDocument();

    userEvent.click(homeText);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Verifica se o link possui o texto "About" '
  + 'e redireciona para a página About', () => {
    const { history } = renderWithRouter(<App />);

    const aboutText = screen.getByRole('link', {
      name: /about/i,
    });
    expect(aboutText).toBeInTheDocument();

    userEvent.click(aboutText);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Verifica se o link possui o texto "Favorite Pokémons" '
  + 'e redireciona para a página Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);

    const favoritePokemons = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    expect(favoritePokemons).toBeInTheDocument();

    userEvent.click(favoritePokemons);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });

  it('Redireciona para uma página de error caso não ache a rota', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/rota-que-não-existe');

    const notFoundText = screen.getByRole('heading', {
      name: /Page requested not found/i,
      level: 2,
    });
    expect(notFoundText).toBeInTheDocument();
  });
});
