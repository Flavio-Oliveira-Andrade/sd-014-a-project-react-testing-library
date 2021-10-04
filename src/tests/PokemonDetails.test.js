import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';
import { PokemonDetails } from '../components';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente PokemonDetails.js', () => {
  const pokemon = pokemons[0];
  const id = { params: { id: '25' } };
  const mockFavorite = { 25: true };

  test('as informações detalhadas do Pokémon selecionado são mostradas na tela.', () => {
    const history = createMemoryHistory();
    // Ajuda do Rodão monstro no Render <3
    render(
      <Router history={ history }>
        <PokemonDetails
          pokemons={ pokemons }
          match={ id }
          isPokemonFavoriteById={ mockFavorite }
        />
      </Router>,
    );
    // A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon
    const text = screen.getByText(`${pokemon.name} Details`);
    expect(text).toBeInTheDocument();

    // Não deve existir o link de navegação para os detalhes do Pokémon selecionado.
    // Isaacão Monstro mandou o match certo.
    const link = screen.queryByText(/More Details/i);
    expect(link).toBeNull();

    // A seção de detalhes deve conter um heading h2 com o texto Summary.
    const h2 = screen.getByRole('heading', { level: 2, name: 'Summary' });
    expect(h2).toBeInTheDocument();

    // A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado.
    const paragraph = screen.getByText(/electricity/i);
    expect(paragraph).toBeInTheDocument();
  });

  test('existe uma seção com os mapas contendo as localizações do pokémon ', () => {
    const history = createMemoryHistory();
    // Ajuda do Rodão monstro no Render <3
    render(
      <Router history={ history }>
        <PokemonDetails
          pokemons={ pokemons }
          match={ id }
          isPokemonFavoriteById={ mockFavorite }
        />
      </Router>,
    );

    // Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of <name>; onde <name> é o nome do Pokémon exibido.
    const h2 = screen.getByRole('heading',
      { level: 2, name: `Game Locations of ${pokemon.name}` });
    expect(h2).toBeInTheDocument();

    // Todas as localizações do Pokémon devem ser mostradas na seção de detalhes;
    pokemon.foundAt.forEach((spawn, i) => {
      const { location, map } = spawn;

      const locationSpawn = screen.getByText(location);
      expect(locationSpawn).toBeInTheDocument();

      const mapSpawn = screen.getAllByAltText(`${pokemon.name} location`);
      expect(mapSpawn[i].src).toBe(map);
    });
  });

  test('o usuário pode favoritar um pokémon através da página de detalhes. ', () => {
    const history = createMemoryHistory();
    // Isaacão monstro recomendou renderizar o App para nao passar funcõ como props;
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    history.push(`/pokemons/${pokemon.id}`);

    // A página deve exibir um checkbox que permite favoritar o Pokémon;
    const checkbox = screen.getByRole('checkbox', { checked: false });
    expect(checkbox).toBeInTheDocument();

    const favorite = screen.queryByAltText(`${pokemon.name} is marked as favorite`);
    expect(favorite).not.toBeInTheDocument();

    // Cliques alternados no checkbox devem adicionar e remover respectivamente o Pokémon da lista de favoritos;
    userEvent.click(checkbox);
    expect(checkbox.checked).toBe(true);
    expect(favorite).toBeDefined();

    // O label do checkbox deve conter o texto Pokémon favoritado?;
    const label = screen.getByLabelText('Pokémon favoritado?');
    expect(label).toBeDefined();
  });
});
