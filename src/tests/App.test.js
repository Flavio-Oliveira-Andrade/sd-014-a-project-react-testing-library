import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import historyRouter from '../services/historyRouter';

describe('Teste o componente <App.js /> ', () => {
  it('Teste se o topo da aplicação contém um conjunto fixo de links de navegação', () => {
    historyRouter(<App />);

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
