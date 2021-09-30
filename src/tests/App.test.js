import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import App from '../App';

test('O topo da aplicação contém um conjunto fixo de links de navegação', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const homeLinkElement = screen.getByRole('link', { name: 'Home' });
  const aboutLinkElement = screen.getByRole('link', { name: 'About' });
  const favoriteLinkElement = screen.getByRole('link', { name: 'Favorite Pokémons' });

  expect(homeLinkElement).toBeInTheDocument();
  expect(aboutLinkElement).toBeInTheDocument();
  expect(favoriteLinkElement).toBeInTheDocument();
});

test('A aplicação é redirecionada para a página inicial, ao clicar no link Home', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const homeLinkElement = screen.getByRole('link', { name: 'Home' });

  expect(homeLinkElement).toBeInTheDocument();
  userEvent.click(homeLinkElement);

  const homeText = screen.getByRole('heading', {
    level: 2,
    name: 'Encountered pokémons',
  });
  expect(homeText).toBeInTheDocument();
});

test('A aplicação é redirecionada para a página About, ao clicar no link About', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const aboutLinkElement = screen.getByRole('link', { name: 'About' });

  expect(aboutLinkElement).toBeInTheDocument();
  userEvent.click(aboutLinkElement);

  const aboutText = screen.getByRole('heading', {
    level: 2,
    name: 'About Pokédex',
  });
  expect(aboutText).toBeInTheDocument();
});

test('A aplicação é redirecionada para a página Pokémons Favoritados,'
+ ' ao clicar no link Favorite Pokémons', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const favoriteLinkElement = screen.getByRole('link', { name: 'Favorite Pokémons' });

  expect(favoriteLinkElement).toBeInTheDocument();
  userEvent.click(favoriteLinkElement);

  const favoritePokemonsText = screen.getByRole('heading', {
    level: 2,
    name: 'Favorite pokémons',
  });
  expect(favoritePokemonsText).toBeInTheDocument();
});

test('A aplicação é redirecionada para a página Not Found '
+ 'ao entrar em uma URL desconhecida', () => {
  const customHistory = createMemoryHistory();

  render(
    <Router history={ customHistory }>
      <App />
    </Router>,
  );

  customHistory.push('/rota-inexistente');

  const notFoundText = screen.getByRole('heading', {
    level: 2,
    name: /Page requested not found/i,
  });

  expect(notFoundText).toBeInTheDocument();
});
