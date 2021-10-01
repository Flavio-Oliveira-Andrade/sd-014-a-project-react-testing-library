import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
// import App from '../App';
import renderWithRouter from '../components/Rotas';

const fakePikachu = {
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
  summary: `This intelligent Pokémon roasts
   hard berries with electricity to make them tender enough to eat.`,
};

describe(' renderizado um card com as informações de determinado pokémon', () => {
  it('Testando renderizado um card', () => {
    renderWithRouter(<Pokemon pokemon={ fakePikachu } isFavorite />);

    const averageWeightC = `Average weight: ${fakePikachu
      .averageWeight.value} ${fakePikachu.averageWeight.measurementUnit}`;

    const cartPokemonName = screen.getByTestId('pokemon-name');
    expect(cartPokemonName).toBeInTheDocument();
    expect(cartPokemonName).toHaveTextContent(fakePikachu.name);

    const cartPokemonType = screen.getByTestId('pokemon-type');
    expect(cartPokemonType).toBeInTheDocument();
    expect(cartPokemonType).toHaveTextContent(fakePikachu.type);

    const cartPokemonAverageWeight = screen.getByTestId('pokemon-weight');
    expect(cartPokemonAverageWeight).toBeInTheDocument();
    expect(cartPokemonAverageWeight).toHaveTextContent(averageWeightC);

    const cartPokemonImgPokemon = screen.getByAltText(/sprite/i);
    expect(cartPokemonImgPokemon).toBeInTheDocument();
    expect(cartPokemonImgPokemon).toHaveAttribute('src', fakePikachu.image);
    expect(cartPokemonImgPokemon).toHaveAttribute('alt', `${fakePikachu.name} sprite`);
  });
});
