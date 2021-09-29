import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

const customTest = (name, text) => {
  const link = screen.getByRole('link', {
    name,
  });
  userEvent.click(link);

  const linkText = screen.getByRole('heading', {
    level: 2,
    name: text,
  });
  expect(linkText).toBeInTheDocument();
};

describe('Testa o componente App', () => {
  test('Teste se <App /> contém um conjunto fixo de links de navegação', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    const home = screen.getByRole('link', {
      name: 'Home',
    });
    const about = screen.getByRole('link', {
      name: 'About',
    });
    const favorite = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
  });

  test('Testa se o link "Home" está funcionando corretamente', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    customTest('Home', /encountered/i);
  });

  test('Testa se o link "About" está funcionando corretamente', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    customTest('About', /about/i);
  });

  test('Testa se o link "Favorites" está funcionando corretamente', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    customTest('Favorite Pokémons', /favorite/i);
  });
});
