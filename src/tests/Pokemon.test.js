import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import renderWithReactRoute from './renderWithReactRoute';

const mockedPokemon = {
  id: 65,
  name: 'Alakazam',
  type: 'Psychic',
  averageWeight: {
    value: '48.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/8/88/Spr_5b_065_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Alakazam_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Unova Accumula Town',
      map: 'https://cdn2.bulbagarden.net/upload/4/44/Unova_Accumula_Town_Map.png',
    },
  ],
};

const beforeEachRenderPokemon = () => {
  beforeEach(() => {
    renderWithReactRoute(<Pokemon
      pokemon={ mockedPokemon }
      isFavorite
    />);
  });
};

describe('Componente Pokemon', () => {
  describe('Card pokemon', () => {
    beforeEachRenderPokemon();

    it('O nome correto do Pokémon deve ser mostrado na tela', () => {
      const pokemonName = screen.getByText(mockedPokemon.name);
      expect(pokemonName).toBeInTheDocument();
    });

    it('O tipo correto do Pokémon deve ser mostrado na tela', () => {
      const pokemonType = screen.getByText(mockedPokemon.type);
      expect(pokemonType).toBeInTheDocument();
    });

    it(`O peso médio do pokémon deve ser exibido com um texto no formato
        Average weight: <value> <measurementUnit>; onde <value> e <measurementUnit> são,
        respectivamente, o peso médio do pokémon e sua unidade de medida.`, () => {
      const { value, measurementUnit } = mockedPokemon.averageWeight;
      const text = `Average weight: ${value} ${measurementUnit}`;
      const AverageWeight = screen.getByText(text);
      expect(AverageWeight).toBeInTheDocument();
    });

    it(`A imagem do Pokémon deve ser exibida. Ela deve conter um atributo
        src com a URL da imagem e um atributo alt com o texto <name> sprite,
        onde <name> é o nome do pokémon`, () => {
      const img = screen.getByAltText(`${mockedPokemon.name} sprite`);
      expect(img).toBeInTheDocument();
      expect(img).toHaveAttribute('src', mockedPokemon.image);
    });
  });

  describe('Link no card Pokemon', () => {
    it(`contém um link de navegação para exibir detalhes deste Pokémon.
        O link deve possuir a URL /pokemons/<id>,onde <id> é o id do Pokémon exibido`,
    () => {
      renderWithReactRoute(<Pokemon
        pokemon={ mockedPokemon }
        isFavorite
      />);
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', `/pokemons/${mockedPokemon.id}`);
    });

    it(`Ao clicar no link de navegação do Pokémon,
        é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.`,
    () => {
      const { history } = renderWithReactRoute(<Pokemon
        pokemon={ mockedPokemon }
        isFavorite
      />);
      const link = screen.getByRole('link');
      fireEvent.click(link);
      const pathPokemonDetails = history.location.pathname;
      expect(pathPokemonDetails).toBe(`/pokemons/${mockedPokemon.id}`);
    });
  });

  describe('Existe um ícone de estrela nos Pokémons favoritados.', () => {
    beforeEachRenderPokemon();

    it(`O ícone deve ser uma imagem com o atributo src contendo o caminho /star-icon.svg.
        A imagem deve ter o atributo alt igual a <pokemon> is marked as favorite,
        onde <pokemon> é o nome do Pokémon exibido.`,
    () => {
      const starIcon = screen.getByAltText(`${mockedPokemon.name} is marked as favorite`);
      expect(starIcon).toBeInTheDocument();
      expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
    });
  });
});
