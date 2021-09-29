import React from 'react';
import {
  screen,
} from '@testing-library/react';

import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

test('deve possuir o texto "Home e link para "/"', () => {
  const { history } = renderWithRouter(<App />);

  history.push('/');

  const homeLink = screen.getByRole('link', {
    name: /home/i,
  });
  expect(homeLink).toBeInTheDocument();

  const homeText = screen.getByRole('heading', {
    level: 2,
    name: /Encountered pokémons/i,
  });
  expect(homeText).toBeInTheDocument();
});

test('deve possuir o texto "About e link para "/about"', () => {
  const { history } = renderWithRouter(<App />);

  history.push('/about');

  const AboutLink = screen.getByRole('link', {
    name: /About/i,
  });
  expect(AboutLink).toBeInTheDocument();

  const AboutText = screen.getByRole('heading', {
    level: 2,
    name: /About Pokédex/i,
  });
  expect(AboutText).toBeInTheDocument();
});

test('deve possuir o texto "Favorite Pokémons e link para "/favorites"', () => {
  const { history } = renderWithRouter(<App />);

  history.push('/favorites');

  const favoritesPokemonLink = screen.getByRole('link', {
    name: /Favorite Pokémons/i,
  });
  expect(favoritesPokemonLink).toBeInTheDocument();

  const favoritesPokemonText = screen.getByRole('heading', {
    level: 2,
    name: /Favorite Pokémons/i,
  });
  expect(favoritesPokemonText).toBeInTheDocument();
});

test('deve possuir a página "Not Found"', () => {
  const { history } = renderWithRouter(<App />);

  history.push('/anyThing');

  const notFoundText = screen.getByRole('heading', {
    level: 2,
    name: /Page requested not found/i,
  });
  expect(notFoundText).toBeInTheDocument();
});
