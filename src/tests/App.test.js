import React from 'react';
import { MemoryRouter } from 'react-router-dom';

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from '../services/renderWithRouter';

describe('App.js test', () => {
  test('Teste se o topo da aplicação contém um conjunto fixo de links de navegação'
  + ' O primeiro link deve possuir o texto Home.', () => {
    render(<MemoryRouter><App /></MemoryRouter>);

    const home = screen.getByText(/Home/i);
    expect(home).toBeInTheDocument();

    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    expect(homeLink).toBeInTheDocument();

    userEvent.click(homeLink);
  });
  test(' O segundo link deve possuir o texto About.', () => {
    render(<MemoryRouter><App /></MemoryRouter>);

    const about = screen.getByText(/about/i);
    expect(about).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    expect(aboutLink).toBeInTheDocument();

    userEvent.click(aboutLink);
  });
  test(' O terceiro link deve possuir o texto Favorite Pokémons.', () => {
    render(<MemoryRouter><App /></MemoryRouter>);

    const favorite = screen.getByText(/Favorite Pokémons/i);
    expect(favorite).toBeInTheDocument();

    const favoriteLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(favoriteLink).toBeInTheDocument();

    userEvent.click(favoriteLink);
  });

  test('exibe a página "Não encontrado" quando eu digitar uma rota inválida', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/rota-que-nao-existe');

    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(notFoundText).toBeInTheDocument();
  });
});
