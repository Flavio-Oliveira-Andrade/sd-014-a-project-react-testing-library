import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';
import { About, FavoritePokemons, NotFound } from '../components';

test(
  'contém um navigation com links "Home", "About" e "Favorite Pokemons", respectivamente',
  () => {
    render(<App />, { wrapper: BrowserRouter });

    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();

    const home = screen.getByRole('link', { name: /Home/i });
    expect(home).toBeInTheDocument();

    const about = screen.getByRole('link', { name: /About/i });
    expect(about).toBeInTheDocument();

    const favoritePokemons = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favoritePokemons).toBeInTheDocument();
  },
);

test(
  'redireciona aplicação para página inicial ao clicar no link "Home"', () => {
    render(<App />, { wrapper: BrowserRouter });

    const home = screen.getByRole('link', { name: /Home/i });
    expect(home).toBeInTheDocument();

    userEvent.click(home);

    const h2 = screen.getByRole('heading', { name: /Encountered pokémons/i, level: 2 });
    expect(h2).toBeInTheDocument();
  },
);

test(
  'redireciona aplicação para a página "About" ao clicar no link respectivo', () => {
    render(<App />, { wrapper: BrowserRouter });

    const about = screen.getByRole('link', { name: /About/i });
    expect(about).toBeInTheDocument();

    userEvent.click(about);

    const h2 = screen.getByRole('heading', { name: /About pokédex/i, level: 2 });
    expect(h2).toBeInTheDocument();
  },
);

test(
  'redireciona para a página "Pokémons favoritados" ao clicar no link respectivo', () => {
    render(<App />, { wrapper: BrowserRouter });

    const favorite = screen.getByRole('link', { name: /Favorite Pokémons/i });
    expect(favorite).toBeInTheDocument();

    userEvent.click(favorite);

    const h2 = screen.getByRole('heading', { name: /Favorite pokémons/i, level: 2 });
    expect(h2).toBeInTheDocument();
  },
);

test(
  'redireciona para a página "Not Found" ao direcionar a um link inexistente', () => {
    const renderWithRouter = (ui, { route = '/' } = {}) => {
      window.history.pushState({}, 'Test page', route);
      return render(ui, { wrapper: BrowserRouter });
    };

    renderWithRouter(<App />, { route: '/not-found' });
    expect(screen.getByText(/Page requested not found/i)).toBeInTheDocument();
  },
);

// https://testing-library.com/docs/example-react-router/

// https://testing-library.com/docs/react-testing-library/migrate-from-enzyme#test-2-input-texts-must-have-correct-value

// https://testing-library.com/docs/queries/byrole/
