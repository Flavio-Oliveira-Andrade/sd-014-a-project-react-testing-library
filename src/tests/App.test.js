import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Teste se o topo da aplicaçãocontémumconjunto fixo de links navegação', () => {
  test('O primeiro link deve possuir o texto Home', () => {
    render(
      <MemoryRouter><App /></MemoryRouter>,
    );
    const tituloHome = screen.getByRole('heading', {
      level: 1,
      name: /pokédex/i,
    });
    expect(tituloHome).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    expect(aboutLink).toBeInTheDocument();

    userEvent.click(aboutLink);

    const tituloAbout = screen.getByRole('heading', {
      level: 2,
      name: /about/i,
    });
    expect(tituloAbout).toBeInTheDocument();
  });

  test('O primeiro link deve possuir o texto Favorite', () => {
    render(
      <MemoryRouter><App /></MemoryRouter>,
    );
    // <MemoryRouter><App /></MemoryRouter>,
    const tituloHome = screen.getByRole('heading', {
      level: 1,
      name: /pokédex/i,
    });
    expect(tituloHome).toBeInTheDocument();

    const favoriteLink = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    expect(favoriteLink).toBeInTheDocument();

    userEvent.click(favoriteLink);

    const tituloFavorite = screen.getByRole('heading', {
      level: 2,
      name: /Favorite pokémons/i,
    });
    expect(tituloFavorite).toBeInTheDocument();
  });
});
