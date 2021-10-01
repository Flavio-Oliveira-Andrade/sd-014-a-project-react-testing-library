import { screen, render } from '@testing-library/react';
import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';
import { About, FavoritePokemons, NotFound } from '../components';

test(
  'o primeiro link possui o text "Home", "About" e "Favorite Pokemons", respectivamente',
  () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const home = screen.getByText(/Home/i);
    expect(home).toBeInTheDocument();

    const about = screen.getByText(/About/i);
    expect(about).toBeInTheDocument();

    const favoritePokemons = screen.getByText(/Favorite Pokémons/i);
    expect(favoritePokemons).toBeInTheDocument();
  },
);

test(
  'redireciona aplicação para página inicial ao clicar no link "Home"', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    expect(screen.getByText(/Encountered pokémons/i));
  },
);

test(
  'redireciona aplicação para a página "About" ao clicar no link respectivo', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <About />
      </Router>,
    );
    expect(screen.getByText(/About pokédex/i));
  },
);

test(
  'redireciona para a página "Pokémons favoritados" ao clicar no link respectivo', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <FavoritePokemons />
      </Router>,
    );
    expect(screen.getByText(/Favorite pokémons/i));
  },
);

test(
  'redireciona para a página "Not Found" ao direcionar a um link inexistente', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <NotFound />
      </Router>,
    );
    expect(screen.getByText(/Page requested not found/i));
  },
);

// https://testing-library.com/docs/example-react-router/
