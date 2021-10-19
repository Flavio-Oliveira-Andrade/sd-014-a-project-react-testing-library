import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderPath from './utilities/renderPath';

describe('Testa se o componente PokemonDatails funciona corretamente', () => {
  const pokemonPath = '/pokemons/25';
  test('Testa se as informações do pokemon aparecem na tela', () => {
    const { history } = renderPath('/');

    const linkToDetails = screen.getByRole('link', {
      name: 'More details',
    });

    userEvent.click(linkToDetails);
    history.push(pokemonPath);

    const pikachuTile = screen.getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });
    const summaryTitle = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    const summaryText = 'This intelligent Pokémon roasts hard berries '
    + 'with electricity to make them tender enough to eat.';
    const summaryParagraphElement = screen.getByText(summaryText);

    expect(pikachuTile).toBeInTheDocument();
    expect(linkToDetails).not.toBeInTheDocument();
    expect(summaryTitle).toBeInTheDocument();
    expect(summaryParagraphElement).toBeInTheDocument();
  });

  test('Testa se existe uma seção com mapas na tela de detalhes', () => {
    renderPath(pokemonPath);

    const POKEMON_LOCATION = 'Pikachu location';
    const titleLocation = screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });
    const mapsImage = screen.getAllByRole('img', {
      name: 'Pikachu location',
    });
    const locationName = screen.getByText('Kanto Viridian Forest');
    const locationName2 = screen.getByText('Kanto Power Plant');

    expect(titleLocation).toBeInTheDocument();

    expect(mapsImage[0]).toBeInTheDocument();
    expect(mapsImage[1]).toBeInTheDocument();
    expect(mapsImage[0].alt).toMatch(POKEMON_LOCATION);
    expect(mapsImage[1].alt).toMatch(POKEMON_LOCATION);
    expect(mapsImage[0].src).toMatch('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(mapsImage[1].src).toMatch('https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');

    expect(locationName).toBeInTheDocument();
    expect(locationName2).toBeInTheDocument();
  });

  test('Testa se o botão de adicionar pokemons aos favoritos funciona', () => {
    renderPath(pokemonPath);

    const btnFavorite = screen.getByText('Pokémon favoritado?');

    expect(btnFavorite).toBeInTheDocument();
  });
});
