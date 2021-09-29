import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('Testando o componete App', () => {
  test('Verificando se possui o link'
  + '"Home" e ao clicar aparece o texto "Encountered pokémons"', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const linkHome = screen.getByRole('link', { name: 'Home' });

    expect(linkHome).toBeInTheDocument();

    userEvent.click(linkHome);
    const elementH2 = screen.getByRole('heading', {
      level: 2,
      name: 'Encountered pokémons',
    });
    expect(elementH2).toBeInTheDocument();
  });

  test('Link "About" e ao clicar aparece o texto "About Pokédex"', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const linkAbout = screen.getByRole('link', { name: 'About' });
    expect(linkAbout).toBeInTheDocument();

    userEvent.click(linkAbout);
    const aboutH2 = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(aboutH2).toBeInTheDocument();
  });

  test('Verificando "Favorito" e ao clicar aparece o texto "Favorite Pokémons"', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const linkFavorite = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(linkFavorite).toBeInTheDocument();

    userEvent.click(linkFavorite);
    const aboutH2 = screen.getByRole('heading', {
      level: 2,
      name: 'Favorite pokémons',
    });
    expect(aboutH2).toBeInTheDocument();
  });
});
