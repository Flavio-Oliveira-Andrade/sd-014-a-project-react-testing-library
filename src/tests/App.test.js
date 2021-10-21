import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

describe('Testa conjunto de Links', () => {
  describe('Teste no Link Home', () => {
    it('renderiza o link com texto Home', () => {
      renderWithRouter(<App />);
      const home = screen.getByText(/home/i);
      expect(home).toBeInTheDocument();
    });

    it('redireciona para pagina /', () => {
      const { history } = renderWithRouter(<App />);
      const home = screen.getByText(/home/i);
      fireEvent.click(home);
      const { pathname } = history.location;

      expect(pathname).toBe('/');
    });
  });
  describe('Teste no Link About', () => {
    it('renderiza o link com texto About', () => {
      renderWithRouter(<App />);
      const about = screen.getByText(/About/i);
      expect(about).toBeInTheDocument();
    });
    it('redireciona para página /about', () => {
      const { history } = renderWithRouter(<App />);
      const about = screen.getByText(/about/i);
      expect(about).toBeInTheDocument();
      fireEvent.click(about);
      const { pathname } = history.location;

      expect(pathname).toBe('/about');
    });
  });
  describe('Teste no link Favorite Pokemons', () => {
    it('renderiza o link com texto Favorite Pokémons', () => {
      renderWithRouter(<App />);
      const favPokemon = screen.getByText(/Favorite Pokémons/i);
      expect(favPokemon).toBeInTheDocument();
    });
    it('redireciona para a pagina /favorite', () => {
      const { history } = renderWithRouter(<App />);
      const favPokemon = screen.getByText(/Favorite Pokémons/i);
      expect(favPokemon).toBeInTheDocument();
      fireEvent.click(favPokemon);
      const { pathname } = history.location;

      expect(pathname).toBe('/favorites');
    });
  });
  describe('Testa pagina nao encontrada', () => {
    it('renderiza Not Found quando nao encontrar url', () => {
      const { history } = renderWithRouter(<App />);
      history.push('/pikachu');
      const notFound = screen.getByText(/not found/i);
      expect(notFound).toBeInTheDocument();
    });
  });
});
