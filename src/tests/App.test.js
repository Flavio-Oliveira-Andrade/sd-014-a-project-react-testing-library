import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

describe('Requisito 1, testa o App.js', () => {
  it('Testa se o app contém um conjunto fixo de links de navegação.', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    const home = screen.getByText(/home/i);
    const about = screen.getByText(/about/i);
    const favorites = screen.getByText(/favorite pokémons/i);

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorites).toBeInTheDocument();
  });

  it('Testa se a aplicação é redirecionada para a página inicial,'
    + 'na URL "/" ao clicar no link Home da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/');
    const homeTitle = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(homeTitle).toBeInTheDocument();
  });

  it('Testa se a aplicação é redirecionada para a página de About, na URL /about,'
    + 'ao clicar no link About da barra de navegação', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const aboutTitle = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });
    expect(aboutTitle).toBeInTheDocument();
  });

  it('Testa se a aplicação é redirecionada para a página de Pokémons Favoritados,'
    + 'na URL /favorites, ao clicar no link Favorite Pokémons', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');
    const favoritesTitle = screen.getByRole('heading', {
      level: 2,
      name: /favorite pokémons/i,
    });
    expect(favoritesTitle).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página'
    + 'Not Found ao entrar em uma URL desconhecida.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/undefined-route');
    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    });
    expect(notFoundText).toBeInTheDocument();
  });
});
