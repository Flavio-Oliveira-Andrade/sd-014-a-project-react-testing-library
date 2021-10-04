import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App';

describe('1. Teste o componente `<App.js />`', () => {
  it('O primeiro link deve possuir o texto `Home`:', () => {
    // Passo 1 - Acesse o componente:
    render(
      <Router>
        <App />
      </Router>,
    );
    // Passo 2 - Interagir com ele (caso haja necessidade):
    // Passo 3 - Faça o teste:
    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('O primeiro link deve possuir o texto `About`:', () => {
    // Passo 1 - Acesse o componente:
    render(
      <Router>
        <App />
      </Router>,
    );
    // Passo 2 - Interagir com ele (caso haja necessidade):
    // Passo 3 - Faça o teste:
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('O primeiro link deve possuir o texto `Favorite Pokémons`:', () => {
    // Passo 1 - Acesse o componente:
    render(
      <Router>
        <App />
      </Router>,
    );
    // Passo 2 - Interagir com ele (caso haja necessidade):
    // Passo 3 - Faça o teste:
    expect(screen.getByRole('link', { name: 'Favorite Pokémons' })).toBeInTheDocument();
  });

  it('Teste se é redirecionada para URL `/` ao clicar no link `Home`:', () => {
    // Passo 1 - Acesse o componente:
    render(
      <Router>
        <App />
      </Router>,
    );
    // Passo 2 - Interagir com ele (caso haja necessidade):
    // fireEvent.click(screen.getByText('Home'));
    // Passo 3 - Faça o teste:
    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/');
  });

  it('Teste se é redirecionada para URL `/about` ao clicar no link `About`:', () => {
    // Passo 1 - Acesse o componente:
    render(
      <Router>
        <App />
      </Router>,
    );
    // Passo 2 - Interagir com ele (caso haja necessidade):
    // fireEvent.click(screen.getByText('Home'));
    // Passo 3 - Faça o teste:
    expect(screen.getByRole('link', { name: 'About' })).toHaveAttribute('href', '/about');
  });

  it('Teste se é redirecionada para URL `/` ao clicar em `Favorite Pokémons`:', () => {
    // Passo 1 - Acesse o componente:
    render(
      <Router>
        <App />
      </Router>,
    );
    // Passo 2 - Interagir com ele (caso haja necessidade):
    // fireEvent.click(screen.getByText('Home'));
    // Passo 3 - Faça o teste:
    expect(screen
      .getByRole('link', { name: 'Favorite Pokémons' }))
      .toHaveAttribute('href', '/favorites');
  });

  it.skip('Teste se é direcionada `Not Found` se acessar uma URL desconhecida:', () => {
    // Passo 1 - Acesse o componente:
    render(
      <Router>
        <App />
      </Router>,
    );
    // Passo 2 - Interagir com ele (caso haja necessidade):
    // fireEvent.click(screen.getByText('Home'));
    // Passo 3 - Faça o teste:
    expect(/* Falta implementar esse requisito. */);
  });
});
