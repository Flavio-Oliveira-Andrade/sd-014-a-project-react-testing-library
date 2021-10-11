// test('', () => {});
import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('6- Teste Pokemon.js', () => {
  const NAME_TESTID = 'pokemon-name';
  const TYPE_TESTID = 'pokemon-type';
  const WEIGHT_TESTID = 'pokemon-weight';

  const {
    id,
    name,
    type,
    averageWeight: { value, measurementUnit },
    image,
  } = pokemons[0];

  test('Teste se o componente com as informações do pokemon são renderizadas', () => {
    renderWithRouter(<App />);
    expect(screen.getByTestId(NAME_TESTID)).toHaveTextContent(name);
    expect(screen.getByTestId(TYPE_TESTID)).toHaveTextContent(type);
    expect(screen.getByTestId(WEIGHT_TESTID))
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
    expect(screen.getByAltText(`${name} sprite`)).toHaveAttribute('src', image);
  });

  test('Teste se o link redireciona para a página de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    expect(screen.getByRole('link', {
      name: /More details/i,
    })).toBeDefined();
    userEvent.click(screen.getByRole('link', {
      name: /More details/i,
    }));
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });

  test('Teste se o card possui uma estrela marcada nos pokemons favoritos', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', {
      name: /More details/i,
    }));
    userEvent.click(screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    }));
    expect(screen.getByRole('img', {
      name: `${name} is marked as favorite`,
    })).toHaveAttribute('src', '/star-icon.svg');
  });
});
