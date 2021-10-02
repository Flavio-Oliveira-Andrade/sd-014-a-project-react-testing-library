import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import renderWithRouter from '../utils/renderWithRouter';

import App from '../App';

describe('1 - Teste o componente <App.js />', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação',
    () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );
      const homeLink = screen.getByRole('link', {
        name: /home/i,
      });
      const aboutLink = screen.getByRole('link', {
        name: /about/i,
      });
      const favLink = screen.getByRole('link', {
        name: /Favorite Pokémons/i,
      });
      expect(homeLink).toBeInTheDocument();
      expect(aboutLink).toBeInTheDocument();
      expect(favLink).toBeInTheDocument();
    });

  it('redirecionar para a URL / ao clicar no link Home da barra de navegação',
    () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );
      const homeLink = screen.getByRole('link', {
        name: /home/i,
      });
      userEvent.click(homeLink);
      expect(screen.getByText('Encountered pokémons')).toBeInTheDocument();
    });

  it('redirecionar para a URL /about ao clicar no link Home da barra de navegação',
    () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );
      const aboutLink = screen.getByRole('link', {
        name: /about/i,
      });
      userEvent.click(aboutLink);
      expect(screen.getByText('About Pokédex')).toBeInTheDocument();
    });

  it('redirecionar para a URL /favorites ao clicar no link Home da barra de navegação',
    () => {
      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>,
      );
      const favLink = screen.getByRole('link', {
        name: /Favorite Pokémons/i,
      });
      userEvent.click(favLink);
      expect(screen.getByText('Favorite pokémons')).toBeInTheDocument();
    });

  it('Teste se a aplicação é redirecionada para a página Not Found'
  + ' ao entrar em uma URL desconhecida',
  () => {
    const { history } = renderWithRouter(<App />);
    history.push('/rota-que-nao-existe');

    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found /i,
    });
    expect(notFoundText).toBeInTheDocument();
  });
});
