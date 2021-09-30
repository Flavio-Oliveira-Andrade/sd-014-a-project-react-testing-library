import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
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
  summary: 'This intelligent Pokémon roasts hard'
  + ' berries with electricity to make them tender enough to eat.',
};

const MOREDETAILS = 'More details';

describe('Testes para o componente PokemonDetails', () => {
  it(`Testando se as informações detalhadas do 
  Pokémon selecionado são mostradas na tela`, () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', {
      name: MOREDETAILS,
    });
    expect(linkDetails).toBeInTheDocument();

    userEvent.click(linkDetails);

    const details = screen.getByRole('heading', {
      level: 2,
      name: `${mockPokemon.name} Details`,
    });
    expect(details).toBeInTheDocument();

    expect(linkDetails).not.toBeInTheDocument();

    const summary = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(summary).toBeInTheDocument();

    const pokemonSummary = screen.getByText(mockPokemon.summary);
    expect(pokemonSummary).toBeInTheDocument();
  });

  it(`Testando se existe na página uma seção
  com os mapas contendo as localizações do pokémon`, () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', {
      name: MOREDETAILS,
    });
    expect(linkDetails).toBeInTheDocument();

    userEvent.click(linkDetails);

    const locationsH2 = screen.getByRole('heading', {
      level: 2,
      name: `Game Locations of ${mockPokemon.name}`,
    });
    expect(locationsH2).toBeInTheDocument();

    const locations = screen.getAllByAltText(`${mockPokemon.name} location`);
    expect(locations).toHaveLength(mockPokemon.foundAt.length);

    const imgLocation = screen.getAllByAltText(/location/);
    imgLocation.forEach((img) => expect(img).toBeInTheDocument());

    mockPokemon.foundAt
      .map(({ location }) => screen.getByText(location))
      .forEach((location) => expect(location).toBeInTheDocument());

    mockPokemon.foundAt
      .forEach(({ map }, index) => expect(imgLocation[index])
        .toHaveAttribute('src', map));

    imgLocation
      .forEach((img) => expect(img)
        .toHaveAttribute('alt', `${mockPokemon.name} location`));
  });

  it(`Testando se o usuário pode favoritar um pokémon
  através da página de detalhes.`, () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', {
      name: MOREDETAILS,
    });
    expect(linkDetails).toBeInTheDocument();

    userEvent.click(linkDetails);

    const checkbox = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });
    expect(checkbox).toBeInTheDocument();

    userEvent.click(checkbox);

    const imgFavorite = screen.getByAltText(/favorite/);
    expect(imgFavorite).toBeInTheDocument();
    userEvent.click(checkbox);
    expect(imgFavorite).not.toBeInTheDocument();

    const labelCheckbox = screen.getByLabelText('Pokémon favoritado?');
    expect(labelCheckbox).toBeInTheDocument();
  });
});
