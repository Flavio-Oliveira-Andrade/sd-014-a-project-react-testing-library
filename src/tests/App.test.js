import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Verifica se o componente App contém'
+ ' um conjunto fixo de links de navegação', () => {
  it('verifica se os links estão presentes na página', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: 'Home' });
    expect(homeLink).toBeInTheDocument();
    const aboutLink = screen.getByRole('link', { name: 'About' });
    expect(aboutLink).toBeInTheDocument();
    const favoriteLink = screen.getByRole('link', { name: 'Favorite Pokémons' });
    expect(favoriteLink).toBeInTheDocument();
  });

  it('ao clicar no link Home, a aplicação é redirecionada para a página inicial', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: 'Home' }));
    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });

  it('ao clicar no link About, a aplicação é redirecionada'
  + ' para a página de About', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: 'About' }));
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
  });

  it('ao clicar no link Favorite Pokémons, a aplicação é redirecionada'
  + ' para a página de Pokémons Favoritados', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: 'Favorite Pokémons' }));
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');
  });
});
