import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../components/Rotas';
import App from '../App';

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

const detalhes = 'More details';

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

  it('Clicando no link e redirecionando para detalhes de Pokemon ', () => {
    renderWithRouter(<App pokemon={ fakePikachu } isFavorite />);
    const linkDetalhes = screen.getByRole('link', {
      name: detalhes,
    });
    expect(linkDetalhes).toBeInTheDocument();
    userEvent.click(linkDetalhes);

    const tituloH2 = screen.getByRole('heading', {
      level: 2,
      name: `${fakePikachu.name} Details`,
    });
    expect(tituloH2).toBeInTheDocument();
  });

  it('Testando se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const linkDetalhes = screen.getByRole('link', {
      name: detalhes,
    });
    expect(linkDetalhes).toBeInTheDocument();

    userEvent.click(linkDetalhes);

    const checkboxCheck = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });
    expect(checkboxCheck).toBeInTheDocument();

    userEvent.click(checkboxCheck);

    const imgFavorite = screen.getByAltText(/favorite/);
    expect(imgFavorite).toBeInTheDocument();
    expect(imgFavorite).toHaveAttribute('src', '/star-icon.svg');
    expect(imgFavorite).toHaveAttribute('alt',
      `${fakePikachu.name} is marked as favorite`);
  });
});
