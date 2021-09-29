import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('App.js test', () => {
  it('deve renderizar o componente App', () => {
    renderWithRouter(<App />);
    const home = screen.getByText('Home');
    expect(home).toBeInTheDocument();
    const about = screen.getByText('About');
    expect(about).toBeInTheDocument();
    const favoritepoke = screen.getByText('Favorite Pokémons');
    expect(favoritepoke).toBeInTheDocument();
  });
  it('Testa se a aplicação é redirecionada para a página inicial'
    + 'na URL / ao clicar no link Home da barra de navegação.', () => {
    const { history } = renderWithRouter(<App />);
    const home = screen.getByRole('link', { name: 'Home' });
    userEvent.click(home);
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
  it('Testa se a aplicação é redirecionada para a página de About na URL /about,'
  + 'ao clicar no link About da barra de navegação.', () => {
    const { history } = renderWithRouter(<App />);
    const about = screen.getByRole('link', { name: 'About' });
    userEvent.click(about);
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });
  it('Testa se a aplicação é redirecionada para a página de Pokémons Favoritados, '
  + 'na URL /favorites, ao clicar no link Favorite Pokémons da barra de navegação.',
  () => {
    const { history } = renderWithRouter(<App />);
    const favoritepoke = screen.getByRole('link', { name: 'Favorite Pokémons' });
    userEvent.click(favoritepoke);
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
  it('Testa se a aplicação é redirecionada para a página Not Found ao'
  + ' entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina/nao/valida');
    const textPageNotFound = screen.getByText('Page requested not found');
    expect(textPageNotFound).toBeInTheDocument();
  });
});
