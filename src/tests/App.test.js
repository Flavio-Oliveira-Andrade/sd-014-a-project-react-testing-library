import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import App from '../App';

describe('Teste o componente <App.js /> ', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    const history = createMemoryHistory();

    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const linkNav = screen.getByRole('navigation');
    expect(linkNav).toBeInTheDocument();

    const home = screen.getByRole('link', { name: /Home/i });
    const about = screen.getByRole('link', { name: /About/i });
    const favorite = screen.getByRole('link', { name: /Favorite Pokémons/i });

    expect(home).toBeInTheDocument();
    expect(about).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();
  });
});
