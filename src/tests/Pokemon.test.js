import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { screen, fireEvent, render } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import renderWithRouter from './utils/renderWithRouter';

const mockPokemon = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
};

describe('Testa o componente Pokemon', () => {
  describe('se é renderizado um card com as informações de determinado pokémon', () => {
    test('O nome correto do Pokémon deve ser mostrado na tela', () => {
      render(
        <MemoryRouter>
          <Pokemon pokemon={ mockPokemon } isFavorite />
        </MemoryRouter>,
      );
      const pokemonName = screen.getByText(mockPokemon.name);
      expect(pokemonName).toBeInTheDocument();
    });

    test('O tipo correto do pokémon deve ser mostrado na tela', () => {
      render(
        <MemoryRouter>
          <Pokemon pokemon={ mockPokemon } isFavorite />
        </MemoryRouter>,
      );
      const pokemonType = screen.getByText(mockPokemon.type);
      expect(pokemonType).toBeInTheDocument();
    });

    test('O peso médio do pokémon deve ser exibido com um texto', () => {
      render(
        <MemoryRouter>
          <Pokemon pokemon={ mockPokemon } isFavorite />
        </MemoryRouter>,
      );
      const { value, measurementUnit } = mockPokemon.averageWeight;
      const text = `Average weight: ${value} ${measurementUnit}`;
      const averageWeight = screen.getByText(text);
      expect(averageWeight).toBeInTheDocument();
    });

    test('A imagem do Pokémon deve ser exibida', () => {
      render(
        <MemoryRouter>
          <Pokemon pokemon={ mockPokemon } isFavorite />
        </MemoryRouter>,
      );
      const imgPokemon = screen.getByAltText(`${mockPokemon.name} sprite`);
      expect(imgPokemon).toBeInTheDocument();
      expect(imgPokemon).toHaveAttribute('src', mockPokemon.image);
    });
  });
  describe('testa link de detalhes', () => {
    test('se o card do Pokémon contém um link de navegação para exibir detalhes', () => {
      render(
        <MemoryRouter>
          <Pokemon pokemon={ mockPokemon } isFavorite />
        </MemoryRouter>,
      );
      const linkNav = screen.getByRole('link');
      expect(linkNav).toBeInTheDocument();
      expect(linkNav).toHaveAttribute('href', `/pokemons/${mockPokemon.id}`);
    });

    test('se vai para a pag de detalhes e a URL exibida no navegador muda ', () => {
      const { history } = renderWithRouter(<Pokemon
        pokemon={ mockPokemon }
        isFavorite
      />);

      const linkNav = screen.getByRole('link');
      expect(linkNav).toBeInTheDocument();
      fireEvent.click(linkNav);
      const pathDetails = history.location.pathname;
      expect(pathDetails).toBe(`/pokemons/${mockPokemon.id}`);
    });
  });

  describe('se existe um ícone de estrela nos Pokémons favoritados', () => {
    test('ícone deve ser uma imagem com o src contendo o caminho /star-icon.svg', () => {
      render(
        <MemoryRouter>
          <Pokemon pokemon={ mockPokemon } isFavorite />
        </MemoryRouter>,
      );
      const star = screen.getByAltText(`${mockPokemon.name} is marked as favorite`);
      expect(star).toBeInTheDocument();
      expect(star).toHaveAttribute('src', '/star-icon.svg');
    });
  });
});

// https://github.com/tryber/sd-014-a-project-react-testing-library/pull/10/commits/b5afcda57795b0f65b7b1b75cd7720ff80ca2d40
// Referencia ao meu irmão Henrique pela ajuda
