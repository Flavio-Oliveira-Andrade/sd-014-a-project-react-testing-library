import React from 'react';
import { Router } from 'react-router';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';

describe('Teste o componente Pokemon.js', () => {
  const mockFavorite = {
    25: true,
  };

  const { name, type, id, image, averageWeight: {
    value, measurementUnit,
  } } = pokemons[0];

  test('renderiza um card com as informações de determinado pokémon.', () => {
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

    // O nome correto do Pokémon deve ser mostrado na tela.
    const pkmnName = screen.getByText(name);
    expect(pkmnName).toBeInTheDocument();

    // O tipo correto do pokémon deve ser mostrado na tela.
    const pkmnType = screen.getByText(type);
    expect(pkmnType).toBeInTheDocument();

    // O peso médio do pokémon deve ser exibido.
    const pkmnWight = screen.getByText(`Average weight: ${value} ${measurementUnit}`);
    expect(pkmnWight).toBeInTheDocument();

    // A imagem do Pokémon deve ser exibida.
    const pkmnImg = screen.queryByAltText(`${name} sprite`);
    expect(pkmnImg.src).toBe(image);
  });

  test('card do Pkmn indicado na Pokédex contém um link para exibir detalhes.', () => {
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

  test('ao clicar no link de navegação do Pokémon, é feito o redirecionamento', () => {
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

  test('existe um ícone de estrela nos Pokémons favoritados ', () => {
    const history = createMemoryHistory();
    render(
      <Router
        history={ history }
      >
        <Pokemon
          pokemon={ pokemons[0] }
          // Rodão Monstro falando que tem q ser true essa disgraça.
          isFavorite
        />
      </Router>,
    );

    const icone = screen.getByAltText(`${name} is marked as favorite`);
    expect(icone.src).toBe('http://localhost/star-icon.svg');
  });
});
