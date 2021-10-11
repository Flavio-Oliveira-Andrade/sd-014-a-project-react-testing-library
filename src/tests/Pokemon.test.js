import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../helpers/renderWithRouter';

const pokemonMock = {
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
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
  test('O nome correto do pokémon é mostrado na tela', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemonMock }
      isFavorite
    />);
    const pokemonName = screen.getByText(pokemonMock.name);
    expect(pokemonName).toBeInTheDocument();
  });

  test('O tipo correto do pokémon é mostrado na tela', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemonMock }
      isFavorite
    />);
    const pokemonType = screen.getByText(pokemonMock.type);
    expect(pokemonType).toBeInTheDocument();
  });

  test('O peso médio e a respectiva unidade de medida do pokémon são exibidos', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemonMock }
      isFavorite
    />);
    const { value, measurementUnit } = pokemonMock.averageWeight;
    const text = `Average weight: ${value} ${measurementUnit}`;
    const averageWeight = screen.getByText(text);
    expect(averageWeight).toBeInTheDocument();
  });

  test('A imagem do pokémon é exibida', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemonMock }
      isFavorite
    />);
    const image = screen.getByAltText(`${pokemonMock.name} sprite`);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', pokemonMock.image);
  });

  test('Existe um link de navegação para exibir detalhes deste pokémon', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemonMock }
      isFavorite
    />);
    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', `/pokemons/${pokemonMock.id}`);
  });

  test(`Ao clicar no link de navegação,
        é feito o redirecionamento da aplicação para a página de detalhes de pokémon.`,
  () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemonMock }
      isFavorite
    />);
    const link = screen.getByRole('link');
    fireEvent.click(link);
    const pathPokemonDetails = history.location.pathname;
    expect(pathPokemonDetails).toBe(`/pokemons/${pokemonMock.id}`);
  });

  test(`O ícone é uma imagem com o atributo src sendo /star-icon.svg
        A imagem deve tem o atributo alt igual a <pokemon> is marked as favorite`,
  () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemonMock }
      isFavorite
    />);
    const starIcon = screen.getByAltText(`${pokemonMock.name} is marked as favorite`);
    expect(starIcon).toBeInTheDocument();
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
