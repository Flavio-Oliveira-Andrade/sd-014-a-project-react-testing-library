import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import App from '../App';

describe('Testes das rotas do componente App', () => {
  test('Testa se há os links na parte superior da tela', () => {
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

  test('Testa se os links levam para a rota correta', () => {
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

    userEvent.click(homeLink);

    const homeText = screen.getByText('Encountered pokémons');
    expect(homeText).toBeInTheDocument();

    userEvent.click(aboutLink);

    const aboutText = screen.getByText('About Pokédex');
    expect(aboutText).toBeInTheDocument();

    userEvent.click(favoriteLink);

    const favoriteText = screen.getByText('Favorite pokémons');
    expect(favoriteText).toBeInTheDocument();
  });

  test('Testa se uma rota não existente leva a pagina "Not found"', () => {
    const customHistory = createMemoryHistory();

    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    customHistory.push('/teste-de-rota-inexistente');

    const notFoundText = screen.getByText('Page requested not found');
    expect(notFoundText).toBeInTheDocument();
  });
});
