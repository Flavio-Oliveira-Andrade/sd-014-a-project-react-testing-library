import { screen, render } from '@testing-library/react';
import React from 'react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router-dom';
import App from '../App';

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

// https://testing-library.com/docs/example-react-router/
