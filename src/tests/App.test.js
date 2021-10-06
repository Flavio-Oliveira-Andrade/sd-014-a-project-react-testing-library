import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';
import NotFound from '../components/NotFound';

it('should redirect to initial page', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>,
  );
  const home = screen.getByRole('link', {
    name: 'Home',
  });
  expect(home).toBeInTheDocument();
  userEvent.click(home);

  const about = screen.getByRole('link', {
    name: 'About',
  });
  expect(about).toBeInTheDocument();
  userEvent.click(about);

  const favoritePokemons = screen.getByRole('link', {
    name: 'Favorite Pokémons',
  });
  expect(favoritePokemons).toBeInTheDocument();
  userEvent.click(favoritePokemons);
});

it('Should redirect to page Not Found', () => {
  render(
    <NotFound />,
  );
  const notFoundLink = screen.getByRole('heading', {
    level: 2,
    name: /not found/i,
  });
  expect(notFoundLink).toBeInTheDocument();
});
