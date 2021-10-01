import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Links do componente <App.js />', () => {
  it('O primeiro link  possui o texto "Home"', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });
    expect(linkHome).toBeInTheDocument();
  });

  it('O segundo link  possui o texto "About"', () => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });
    expect(linkAbout).toBeInTheDocument();
  });

  it('O terceiro link  possuiro texto "Favorite Pokémons"', () => {
    renderWithRouter(<App />);
    const linkFavorite = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(linkFavorite).toBeInTheDocument();
  });
});

describe('Redirecionamento dos links do componente <App.js />', () => {
  it('Aplicação é redirecionada para a página inicial ao clicar no link "Home" ', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByRole('link', { name: /home/i });
    const textPokedex = screen.getByText(/Pokédex/);
    userEvent.click(linkHome);
    expect(textPokedex).toBeInTheDocument();
  });

  it('Aplicação é redirecionada para a página "About" ao clicar no link "About"', () => {
    renderWithRouter(<App />);
    const linkAbout = screen.getByRole('link', { name: /about/i });
    userEvent.click(linkAbout);
    const textAbout = screen.getByText(/encyclopedia/i);
    expect(textAbout).toBeInTheDocument();
  });

  it('Aplicação é redirecionada para a página "Pokémons Favoritados'
  + 'ao clicar no link "Favorite Pokémons"', () => {
    renderWithRouter(<App />);
    const linkFavorite = screen.getByRole('link', { name: /favorite pokémons/i });
    userEvent.click(linkFavorite);
    const textFavorite = screen.getByText(/No favorite pokemon found/i);
    expect(textFavorite).toBeInTheDocument();
  });

  it('A aplicação é redirecionada para a página Not Found'
  + 'ao entrar em uma URL desconhecida', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/aqui-pode-ser-xablau');
    const textNotFound = screen.getByText(/😭/i);
    expect(textNotFound).toBeInTheDocument();
  });
});
