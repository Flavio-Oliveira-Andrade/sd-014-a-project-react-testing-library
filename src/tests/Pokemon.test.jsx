import React from 'react';
import { Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';

// Com ajudar do braia

describe('Componente Pokemon.js', () => {
  const mockFavorite = {
    21: true,
  };

  const { name, type, id, image, averageWeight: {
    value, measurementUnit,
  } } = pokemons[0];

  test('renderiza card com informações do pokémon.', () => {
    const history = createMemoryHistory();
    render(
      <Router
        history={ history }
      >
        <Pokemon
          pokemon={ pokemons[0] }
          isFavorite={ mockFavorite[pokemons[id]] }
        />
      </Router>,
    );

    const PKMType = screen.getByText(type);
    const PKMWight = screen.getByText(`Average weight: ${value} ${measurementUnit}`);
    const PKMImg = screen.queryByAltText(`${name} sprite`);
    const PKMName = screen.getByText(name);

    expect(PKMWight).toBeInTheDocument();
    expect(PKMType).toBeInTheDocument();
    expect(PKMImg.src).toBe(image);
    expect(PKMName).toBeInTheDocument();
  });

  test('testa link do card', () => {
    const history = createMemoryHistory();
    render(
      <Router
        history={ history }
      >
        <Pokemon
          pokemon={ pokemons[0] }
          isFavorite={ mockFavorite[pokemons[id]] }
        />
      </Router>,
    );

    const link = screen.queryByRole('link', { name: 'More details' });

    expect(link.href).toBe(`http://localhost/pokemons/${id}`);
  });

  test('teste pra redirecionar quando clica ', () => {
    const history = createMemoryHistory();
    render(
      <Router
        history={ history }
      >
        <Pokemon
          pokemon={ pokemons[0] }
          isFavorite={ mockFavorite[pokemons[id]] }
        />
      </Router>,
    );

    const link = screen.queryByRole('link', { name: 'More details' });

    userEvent.click(link);

    const { pathname } = history.location;

    expect(pathname).toBe(`/pokemons/${id}`);
  });

  test('verifica ser tem um estrelinha no pkm favorito ', () => {
    const history = createMemoryHistory();
    render(
      <Router
        history={ history }
      >
        <Pokemon
          pokemon={ pokemons[0] }
          isFavorite
        />
      </Router>,
    );

    const icone = screen.getByAltText(`${name} is marked as favorite`);

    expect(icone.src).toBe('http://localhost/star-icon.svg');
  });
});
