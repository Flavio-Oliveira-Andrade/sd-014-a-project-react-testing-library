import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './util/renderWithRouter';

describe('Teste do componente <App.js />', () => {
  it('Verifica se o topo da aplicação contém'
    + ' um conjunto fixo de links de navegação', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();

    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();

    const favoritePokemonsLink = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(favoritePokemonsLink).toBeInTheDocument();
  });

  it('Verifica se a aplicação é redirecionada para a página inicial,'
  + ' na URL "/" ao clicar no link "Home" da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeLink);
    expect(history.location.pathname).toBe('/');
  });

  it('Verifica se a aplicação é redirecionada para a página de About,'
  + ' na URL "/about" ao clicar no link "About" da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });

  it('Verifica se a aplicação é redirecionada para a página "Pokémons Favortitados",'
  + ' na URL "/favorites" ao clicar no link "Favorite Pokémons" da barra de navegação',
  () => {
    const { history } = renderWithRouter(<App />);
    const favoritePokemonsLink = screen.getByRole('link', {
      name: /favorite pokémons/i,
    });
    userEvent.click(favoritePokemonsLink);
    expect(history.location.pathname).toBe('/favorites');
  });

  it('Verifica se a aplicação é redirecionada para a página "Not Found"'
  + ' ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina-nao-existe');
    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/i,
    });
    expect(notFoundText).toBeInTheDocument();
  });
});
