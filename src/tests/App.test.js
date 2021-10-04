import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa se renderiza o componente App', () => {
  it('Testa se a aplicação apresenta os links descritos de navegação', () => {
    renderWithRouter(<App />);
    const linkHome = screen.getByText(/home/i);
    const linkAbount = screen.getByText(/about/i);
    const linkFavoritePokemons = screen.getByText(/favorite pokémons/i);
    expect(linkHome).toBeInTheDocument();
    expect(linkAbount).toBeInTheDocument();
    expect(linkFavoritePokemons).toBeInTheDocument();
  });

  it('Testa se ao clicar sobre o link Home renderiza o path /', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/home/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('Testa se ao clicar sobre o link About renderiza o path /about', () => {
    const { history } = renderWithRouter(<App />);
    fireEvent.click(screen.getByText(/about/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('Testa se ao clicar sobre o link Favorite Pokemons renderiza o path /favorite',
    () => {
      const { history } = renderWithRouter(<App />);
      fireEvent.click(screen.getByText(/favorite pokémons/i));
      const { pathname } = history.location;
      expect(pathname).toBe('/favorites');
    });

  it('Deve testar um caminho não existente renderiza Not Found', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/pagina-aleatoria/que-nao-existe');
    const notFound = screen.getByText(/requested not found/i);
    expect(notFound).toBeInTheDocument();
  });
});
