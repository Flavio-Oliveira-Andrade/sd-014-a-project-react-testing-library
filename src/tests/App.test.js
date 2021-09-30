import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Testes do componente App', () => {
  it('Teste se o topo da aplicação contem um conjunto de links', () => {
    renderWithRouter(<App />);

    const btnHome = screen.getByRole('link', {
      name: /home/i,
    });
    const btnAbout = screen.getByRole('link', {
      name: /about/i,
    });
    const btnFavorite = screen.getByRole('link', {
      name: /favorite/i,
    });
    expect(btnHome).toBeInTheDocument();
    expect(btnAbout).toBeInTheDocument();
    expect(btnFavorite).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada ao clicar no link Home', () => {
    const { history } = renderWithRouter(<App />);

    const btnHome = screen.getByRole('link', {
      name: /home/i,
    });

    userEvent.click(btnHome);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
    const textHome = screen.getByText('Encountered pokémons');
    expect(textHome).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada ao clicar no link About', () => {
    const { history } = renderWithRouter(<App />);

    const btnAbout = screen.getByRole('link', {
      name: /about/i,
    });

    userEvent.click(btnAbout);

    const { pathname } = history.location;
    expect(pathname).toBe('/about');
    const textAbout = screen.getByText('About Pokédex');
    expect(textAbout).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada ao clicar no link Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);

    const btnFavorite = screen.getByRole('link', {
      name: /favorite/i,
    });

    userEvent.click(btnFavorite);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
    const textFavorite = screen.getByText('Favorite pokémons');
    expect(textFavorite).toBeInTheDocument();
  });

  it(`Teste se a aplicação é redirecionada para a 
  página Not Found ao entrar em uma URL desconhecida.`, () => {
    const { history } = renderWithRouter(<App />);

    history.push('/not-found');

    const notExist = screen.getByText(/not found/i);
    expect(notExist).toBeInTheDocument();
  });
});
