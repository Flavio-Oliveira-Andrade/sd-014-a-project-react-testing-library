import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import { Pokemon } from '../components';

const pokemon = {
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
// https://github.com/tryber/sd-014-a-project-react-testing-library/pull/23/commits
// /6f5e80816de3633d164beec2654dbc1ec5b9c2bc
// Referencia ao Fernando pelo conhecimento disponibilizado
describe('Pokemon.js test', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    render(<MemoryRouter><Pokemon pokemon={ pokemon } isFavorite /></MemoryRouter>);

    const pokemonName = screen.getByText(pokemon.name);
    const pokemonType = screen.getByText(pokemon.type);
    const { value, measurementUnit } = pokemon.averageWeight;
    const text = `Average weight: ${value} ${measurementUnit}`;
    const AverageWeight = screen.getByText(text);
    const img = screen.getByAltText(`${pokemon.name} sprite`);

    expect(AverageWeight).toBeInTheDocument();
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonType).toBeInTheDocument();
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', pokemon.image);
  });

  test('Se o card do Pokémon contém um link de navegação para exibir detalhes'
  + 'O link deve possuir a URL /pokemons/<id>,<id> é o id do Pokémon exibido', () => {
    render(<MemoryRouter><Pokemon pokemon={ pokemon } isFavorite /></MemoryRouter>);

    const link = screen.getByRole('link');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', `/pokemons/${pokemon.id}`);
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    render(<MemoryRouter><Pokemon pokemon={ pokemon } isFavorite /></MemoryRouter>);

    const favorite = screen.getByAltText(`${pokemon.name} is marked as favorite`);
    expect(favorite).toBeInTheDocument();
    expect(favorite).toHaveAttribute('src', '/star-icon.svg');
  });
});
