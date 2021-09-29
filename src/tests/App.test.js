import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from '../renderWithRouter';

test('Testa se o topo da aplicação contém um conjunto de links de navegação', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const homeText = screen.getByText('Home');
  expect(homeText).toBeInTheDocument();

  const aboutText = screen.getByText('About');
  expect(aboutText).toBeInTheDocument();

  const favoriteText = screen.getByText('Favorite Pokémons');
  expect(favoriteText).toBeInTheDocument();
});

test('Teste se a aplicação é redirecionada para a página inicial,'
 + 'na URL / ao clicar no link Home da barra de navegação.', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const homeLink = screen.getByRole('link', {
    name: 'Home',
  });
  userEvent.click(homeLink);
  expect(homeLink).toBeInTheDocument();
});

test('Teste se a aplicação é redirecionada para a página de About,'
+ 'na URL / ao clicar no link About da barra de navegação.', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const aboutLink = screen.getByRole('link', {
    name: 'About',
  });
  userEvent.click(aboutLink);
  expect(aboutLink).toBeInTheDocument();
});

test('Teste se a aplicação é redirecionada para a página de Pokémons Favoritados,'
+ 'na URL / ao clicar no link Favorite Pokémons da barra de navegação.', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const favortitePokemonLink = screen.getByRole('link', {
    name: 'Favorite Pokémons',
  });
  userEvent.click(favortitePokemonLink);
  expect(favortitePokemonLink).toBeInTheDocument();
});

test('Teste se a aplicação é redirecionada para a página Not Found'
+ 'ao entrar em uma URL desconhecida.', () => {
  const { history } = renderWithRouter(<App />);

  history.push('/url-desconhecida');

  const notFoundtext = screen.getByText('Page requested not found');
  expect(notFoundtext).toBeInTheDocument();
});
