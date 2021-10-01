import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Router } from 'react-router';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('Testando App.js', () => {
  test('testa se os links "Home", "About",'
  + '"Favorite Pokémons" aparecem na página', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    expect(homeLink).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    expect(aboutLink).toBeInTheDocument();

    const favoriteLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    expect(favoriteLink).toBeInTheDocument();
  });

  test('ao clicar em "Home" renderiza a página inicial', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });
    userEvent.click(homeLink);
    const testingHome = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(testingHome).toBeInTheDocument();
  });

  test('ao clicar em "About" renderiza a página about', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });
    userEvent.click(aboutLink);
    const testingAbout = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });
    expect(testingAbout).toBeInTheDocument();
  });
  test('ao clicar em "Favorite Pokémons" renderiza a página Favorite Pokémons', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const favoriteLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    userEvent.click(favoriteLink);
    const testingHome = screen.getByRole('heading', {
      level: 2,
      name: /favorite pokémons/i,
    });
    expect(testingHome).toBeInTheDocument();
  });

  test('redireciona para "Not Found", quando digitar uma rota não existe', () => {
    const changeHistory = createMemoryHistory();

    render(
      <Router history={ changeHistory }>
        <App />
      </Router>,
    );

    changeHistory.push('/rota-inexistente');
    const testingNotFound = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });
    expect(testingNotFound).toBeInTheDocument();
  });
});
