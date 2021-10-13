import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Pokemon from '../components/Pokemon';

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

test('should appear a card with a pokemon', () => {
  const { value, measurementUnit } = mockPokemon.averageWeight;
  render(
    <MemoryRouter>
      <Pokemon
        pokemon={ mockPokemon }
        isFavorite
      />
    </MemoryRouter>,
  );
  const pokeName = screen.getByText(`${mockPokemon.name}`);
  const pokeType = screen.getByText(`${mockPokemon.type}`);
  const pokeAverageWeight = screen.getByText(
    `Average weight: ${value} ${measurementUnit}`,
  );
  const pokeImg = screen.getByRole('img', {
    name: /pikachu sprite/i,
  });

  expect(pokeName).toBeInTheDocument();
  expect(pokeType).toBeInTheDocument();
  expect(pokeAverageWeight).toBeInTheDocument();
  expect(pokeImg).toHaveAttribute('src', `${mockPokemon.image}`);
  expect(pokeImg).toHaveAttribute('alt', `${mockPokemon.name} sprite`);
});

test('test if the url changes when clicking on pok that wants to see the dtls', () => {
  render(
    <MemoryRouter>
      <Pokemon
        pokemon={ mockPokemon }
        isFavorite={ false }
      />
    </MemoryRouter>,
  );

  const url = `/pokemons/${mockPokemon.id}`;
  const linkDetails = screen.getByRole('link', {
    name: /more details/i,
  });

  expect(linkDetails).toBeInTheDocument();
  expect(linkDetails).toHaveAttribute('href', url);
});

test('if there is a star icon in a favorite pokemon', () => {
  render(
    <MemoryRouter>
      <Pokemon
        pokemon={ mockPokemon }
        isFavorite
      />
    </MemoryRouter>,
  );

  const srcImgFav = '/star-icon.svg';
  const iconFav = screen.getAllByRole('img')[1]; // capturo o ícone (img) de estrela

  expect(iconFav).toHaveAttribute('src', srcImgFav);
  expect(iconFav).toHaveAttribute('alt', `${mockPokemon.name} is marked as favorite`);
});
