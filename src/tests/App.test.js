import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import NotFound from '../components/NotFound';

// Requisito 1
test('testa se a aplicação é redirecionada para a página inicial, '
+ 'na URL / ao clicar no link Home da barra de navegação', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const homeLink = screen.getByRole('link', {
    name: /home/i,
  });
  expect(homeLink).toBeInTheDocument();
  userEvent.click(homeLink);
});

// Requisito 1
test('testa se a aplicação é redirecionada para a página de About, '
+ 'na URL /about, ao clicar no link About da barra de navegação', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const aboutLink = screen.getByRole('link', {
    name: /about/i,
  });
  expect(aboutLink).toBeInTheDocument();
  userEvent.click(aboutLink);
});

// Requisito 1
test('testa se a aplicação é redirecionada para a página de Pokémons Favoritados '
+ 'na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );

  const favoriteLink = screen.getByRole('link', {
    name: /favorite/i,
  });
  expect(favoriteLink).toBeInTheDocument();
  userEvent.click(favoriteLink);
});

// Requisito 1
test('testa se a aplicação é redirecionada para a página Not Found '
+ 'ao entrar em uma URL desconhecida', () => {
  render(<NotFound />);

  const notFoundLink = screen.getByRole('heading', {
    level: 2,
    name: /not found/i,
  });
  expect(notFoundLink).toBeInTheDocument();
});
