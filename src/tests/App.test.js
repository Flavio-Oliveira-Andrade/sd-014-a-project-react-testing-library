import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('Teste o componente <App.js />', () => {
  test('Teste se a pagina contém um conjunto fixo de links de navegação.', () => {
    render(<MemoryRouter><App /></MemoryRouter>);

    const linkHome = screen.getByRole('link', { name: /home/i });
    const About = screen.getByRole('link', { name: /about/i });
    const linkFavoritePokémons = screen.getByRole('link', { name: /favorite pokémons/i });

    expect(linkHome).toBeInTheDocument();
    expect(About).toBeInTheDocument();
    expect(linkFavoritePokémons).toBeInTheDocument();
  });
  test('Se ao clicar no link Home é redirecionada para a página inicial',
    () => {
      render(<MemoryRouter><App /></MemoryRouter>);
      const linkHome = screen.getByRole('link', { name: /home/i });
      fireEvent.click(linkHome);
      expect(linkHome.href).toBe('http://localhost/');
    });
  test('Se ao clicar no link About é redirecionada para a página About', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    const About = screen.getByRole('link', { name: /about/i });
    fireEvent.click(About);
    expect(About.href).toBe('http://localhost/about');
  });
  test('Se ao clicar no link FavoritesPokemons é redirecionada para a página favorites',
    () => {
      render(<MemoryRouter><App /></MemoryRouter>);
      const linkFavorites = screen.getByRole('link', { name: /favorite pokémons/i });
      fireEvent.click(linkFavorites);
      expect(linkFavorites.href).toBe('http://localhost/favorites');
    });
});
