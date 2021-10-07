import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Teste do App', () => {
  it('Testa se o topo da aplicação renderiza corretamente.', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    customHistory.push('/');

    const homeLink = screen.getByRole('link', { name: /home/i });

    expect(homeLink).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /favorite/i })).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página inicial,'
  + ' na URL "/" ao clicar no link Home da barra de navegação', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    customHistory.push('/');
    userEvent.click(screen.getByRole('link', { name: /home/i }));

    expect(screen.getByRole('heading', {
      level: 2,
      name: /encountered/i,
    })).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página de About,'
  + ' na URL "/about" ao clicar no link About da barra de navegação', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    customHistory.push('/about');
    userEvent.click(screen.getByRole('link', { name: /about/i }));

    expect(screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    })).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página de About, na URL'
  + ' "/favorites" ao clicar no link Favorites Pokémons da barra de navegação', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    customHistory.push('/favorite');
    userEvent.click(screen.getByRole('link', { name: /favorite/i }));

    expect(screen.getByRole('heading', {
      level: 2,
      name: /favorite pokémons/i,
    })).toBeInTheDocument();
  });

  it('Teste se a aplicação é redirecionada para a página Not Found ao'
  + ' entrar em uma URL desconhecida.', () => {
    const customHistory = createMemoryHistory();
    render(
      <Router history={ customHistory }>
        <App />
      </Router>,
    );

    customHistory.push('/notfound');

    expect(screen.getByRole('heading', {
      level: 2,
      name: /page requested not found/i,
    })).toBeInTheDocument();
  });
});
