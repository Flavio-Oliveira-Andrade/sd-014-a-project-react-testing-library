import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter.test';

import App from '../App';

describe('01-Teste o componente "App.js"', () => {
  test('se redireciona para página inicial', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(homeLink);
  });

  test('se redireciona para página About', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', {
      name: 'About',
    });
    userEvent.click(aboutLink);
  });

  test('se redireciona para pagina Favorites Pokémons', () => {
    renderWithRouter(<App />);
    const favoriteLink = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });
    userEvent.click(favoriteLink);
  });
});
