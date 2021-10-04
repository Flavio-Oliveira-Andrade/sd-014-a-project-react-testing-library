import React from 'react';
import {
  screen,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import renderWithRouter from './utils/renderWithRouter';
import Pokedex from '../components/Pokedex';

const objectFavoritesPokemon = [
  {
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
    summary: 'This intelligent Pokémon roasts hard'
    + 'berries with electricity to make them tender enough to eat.',
  },
  {
    id: 4,
    name: 'Charmander',
    type: 'Fire',
    averageWeight: {
      value: '8.5',
      measurementUnit: 'kg',
    },
    image: 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png',
    moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Charmander_(Pok%C3%A9mon)',
    foundAt: [
      {
        location: 'Alola Route 3',
        map: 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png',
      },
      {
        location: 'Kanto Route 3',
        map: 'https://cdn2.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png',
      },
      {
        location: 'Kanto Route 4',
        map: 'https://cdn2.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png',
      },
      {
        location: 'Kanto Rock Tunnel',
        map: 'https://cdn2.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png',
      },
    ],
    summary: 'The flame on its tail shows the strength of its life force.'
    + 'If it is weak, the flame also burns weakly.',
  },
];

const isPokemonFavoriteById = [{
  4: false,
  23: true,
  25: true,
},
];

test('se página contém um heading h2 com o texto "Encountered pokémons"', () => {
  const { history } = renderWithRouter(<App />);

  history.push('/');

  const pokedex = screen.getByRole('heading', {
    level: 2,
    name: /Encountered pokémons/i,
  });
  expect(pokedex).toBeInTheDocument();
});

test('se é exibido o próximo Pokémon da lista'
  + ' quando o botão "Próximo pokémon" é clicado.', () => {
  const { history } = renderWithRouter(
    <Pokedex
      pokemons={ objectFavoritesPokemon }
      isPokemonFavoriteById={ isPokemonFavoriteById }
    />,
  );

  history.push('/');

  const buttonPróxPoke = screen.getByRole('button', {
    name: 'Próximo pokémon',
  });
  expect(buttonPróxPoke).toBeInTheDocument();
  userEvent.click(buttonPróxPoke);

  const nextCardPokemon = screen.getByTestId('pokemon-name').innerHTML;
  expect(nextCardPokemon).toEqual('Charmander');

  userEvent.click(buttonPróxPoke);

  const firstCardPokemon = screen.getByTestId('pokemon-name').innerHTML;
  expect(firstCardPokemon).toEqual('Pikachu');
});

test('se é mostrado apenas um Pokémon por vez.', () => {
  const { history } = renderWithRouter(<App />);

  history.push('/');

  const cardsFavoritesPokemon = screen.queryAllByText('More details').length;
  const lengthArray = 1;
  expect(cardsFavoritesPokemon).toEqual(lengthArray);
});

test('se a Pokédex tem os botões de filtro.', () => {
  renderWithRouter(<App />);

  const buttonType = screen.queryAllByTestId('pokemon-type-button');
  const lengthButtonsType = 7;
  expect(buttonType.length).toEqual(lengthButtonsType);

  const buttonElectric = screen.getByRole('button', { name: /electric/i });
  expect(buttonElectric).toBeInTheDocument();

  const buttonFire = screen.getByRole('button', { name: /fire/i });
  expect(buttonFire).toBeInTheDocument();

  const buttonbug = screen.getByRole('button', { name: /bug/i });
  expect(buttonbug).toBeInTheDocument();

  const buttonPoison = screen.getByRole('button', { name: /poison/i });
  expect(buttonPoison).toBeInTheDocument();

  const buttonPsychic = screen.getByRole('button', { name: /psychic/i });
  expect(buttonPsychic).toBeInTheDocument();

  const buttonNormal = screen.getByRole('button', { name: /normal/i });
  expect(buttonNormal).toBeInTheDocument();

  const buttonDragon = screen.getByRole('button', { name: /dragon/i });
  expect(buttonDragon).toBeInTheDocument();

  userEvent.click(buttonFire);
  const typePokemon = screen.getByTestId('pokemon-type').innerHTML;
  expect(typePokemon).toEqual('Fire');

  const buttonAll = screen.getByRole('button', { name: /all/i }).disabled;
  expect(buttonAll).toEqual(false);
});

test('se a Pokédex contém um botão para resetar o filtro.', () => {
  renderWithRouter(<App />);

  const buttonDragon = screen.getByRole('button', { name: /dragon/i });
  expect(buttonDragon).toBeInTheDocument();

  userEvent.click(buttonDragon);
  const typePokemon = screen.getByTestId('pokemon-type').innerHTML;
  expect(typePokemon).toEqual('Dragon');

  const buttonAll = screen.getByRole('button', { name: /all/i });
  userEvent.click(buttonAll);
  const typePokemonInitial = screen.getByTestId('pokemon-type').innerHTML;
  expect(typePokemonInitial).toEqual('Electric');
});
