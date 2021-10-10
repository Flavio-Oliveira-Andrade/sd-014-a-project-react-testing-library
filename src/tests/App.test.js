// Refatorado com a explicacao de Tiago Sathler

import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';

import App from '../App';

describe('Testa o componente "App"', () => {
  test('O primeiro link deve possuir o texto `Home`', () => {
    renderWithRouter(<App />);

    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
  });

  test('O segundo link deve possuir o texto `About`', () => {
    renderWithRouter(<App />);

    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
  });

  test('O terceiro link deve possuir o texto `Favorite Pokémons`', () => {
    renderWithRouter(<App />);

    const pokemonsLink = screen.getByRole('link', { name: /pokémons/i });
    expect(pokemonsLink).toBeInTheDocument();
  });

  test('A aplicação é redirecionada para a página'
  + ' inicial, na URL `/` ao clicar no link `Home`', () => {
    const { history } = renderWithRouter(<App />);

    // history.push('/');
    const homeLink = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeLink);

    // const pokedexText = screen.getByRole('heading', { name: /pokédex/i });
    // expect(pokedexText).toBeInTheDocument();
    // history.location.pathname
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });

  test('a aplicação é redirecionada para a página de'
  + '`About`, na URL `/about`, ao clicar no link `About`', () => {
    const { history } = renderWithRouter(<App />);

    // history.push('/about');
    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);

    // const aboutText = screen.getByRole('heading', {
    //   level: 2,
    //   name: /about Pokédex/i,
    // });
    // expect(aboutText).toBeInTheDocument();
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });

  test('a aplicação é redirecionada para a página de `Pokémons Favoritados`,'
  + 'na URL `/favorites`, ao clicar no link `Favorite Pokémons`', () => {
    const { history } = renderWithRouter(<App />);

    // history.push('/favorites');
    const pokemonsLink = screen.getByRole('link', { name: /pokémons/i });
    userEvent.click(pokemonsLink);

    // const favoriteText = screen.getByRole('heading', {
    //   level: 2,
    //   name: /favorite pokémons/i,
    // });
    // expect(favoriteText).toBeInTheDocument();
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorites');
  });

  test('Verificar se a aplicação é redirecionada para a página'
  + '`Not Found` ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/hola');

    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: 'Page requested not found Crying emoji' });
    expect(notFoundText).toBeInTheDocument();
  });
});
