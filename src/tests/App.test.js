import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Testa o componente App', () => {
  test('O primeiro link deve possuir o texto Home'
  + 'e se a aplicação é redirecionada para a página inicial', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const home = screen.getByText('Home');
    expect(home).toBeInTheDocument();

    const homeLink = screen.getByRole('link', {
      name: /Home/i,
    });
    expect(homeLink).toBeInTheDocument();

    userEvent.click(homeLink);
  });

  test('O segundo link deve possuir o texto About'
  + 'e se a aplicação é redirecionada para a página about', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const about = screen.getByText('About');
    expect(about).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', {
      name: /About/i,
    });
    expect(aboutLink).toBeInTheDocument();

    userEvent.click(aboutLink);
  });

  test('O terceiro link deve possuir o texto Favorite Pokémons'
  + 'e se a aplicação é redirecionada para a página Favorite Pokémons', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const favoritePokemons = screen.getByText('Favorite Pokémons');
    expect(favoritePokemons).toBeInTheDocument();

    const favoritePokemonsLink = screen.getByRole('link', {
      name: /Favorite Pokémons/i,
    });
    expect(favoritePokemonsLink).toBeInTheDocument();

    userEvent.click(favoritePokemonsLink);
  });

  test('Se é redirecionada para a página Not Found ao entrar em URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/rota-que-nao-existe');

    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(notFoundText).toBeInTheDocument();
  });
});
