import React from 'react';
import { Router } from 'react-router';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import App from '../App';

function renderWithRouter(component) {
  const customHistory = createMemoryHistory();
  return {
    ...render(
      <Router history={ customHistory }>
        {component}
      </Router>,
    ),
    history: customHistory,
  };
}

describe('1 Requisito', () => {
  test('Se o Home é renderizado no primeiro Link', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/');

    const homeLink = screen.getByRole('link', {
      name: /home/i,
    });

    const heading = screen.getByRole('heading', {
      level: 2,
      name: /encountered/i,
    });

    expect(homeLink).toBeInTheDocument();
    userEvent.click(homeLink);
    expect(heading).toBeInTheDocument();
  });

  test('Se o About é renderizado no segundo Link', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/about');

    const aboutLink = screen.getByRole('link', {
      name: /about/i,
    });

    const heading = screen.getByRole('heading', {
      level: 2,
      name: /about/i,
    });

    expect(aboutLink).toBeInTheDocument();
    userEvent.click(aboutLink);
    expect(heading).toBeInTheDocument();
  });

  test('Se o Favorite Pokémons é renderizado no terceiro Link', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/favorites');

    const favPokemons = screen.getByRole('link', {
      name: /favorite/i,
    });

    const heading = screen.getByRole('heading', {
      level: 2,
      name: /favorite/i,
    });

    expect(favPokemons).toBeInTheDocument();
    userEvent.click(favPokemons);
    expect(heading).toBeInTheDocument();
  });
});
