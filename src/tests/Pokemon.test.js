import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
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
  summary: `This intelligent Pokémon roasts 
  hard berries with electricity to make them tender enough to eat.`,
};

const TEXTMOREDETAILS = 'More details';

describe('Testes do componente Pokemon', () => {
  it(`Testando se é renderizado um card com as
  informações de determinado pokémon`, () => {
    renderWithRouter(<Pokemon pokemon={ mockPokemon } isFavorite />);
    const AVERAGEWEIGHT = `Average weight: ${mockPokemon
      .averageWeight.value} ${mockPokemon.averageWeight.measurementUnit}`;

    const namePokemon = screen.getByTestId('pokemon-name');
    expect(namePokemon).toBeInTheDocument();
    expect(namePokemon).toHaveTextContent(mockPokemon.name);

    const typePokemon = screen.getByTestId('pokemon-type');
    expect(typePokemon).toBeInTheDocument();
    expect(typePokemon).toHaveTextContent(mockPokemon.type);

    const averageWeightPokemon = screen.getByTestId('pokemon-weight');
    expect(averageWeightPokemon).toBeInTheDocument();
    expect(averageWeightPokemon).toHaveTextContent(AVERAGEWEIGHT);

    const imgPokemon = screen.getByAltText(/sprite/i);
    expect(imgPokemon).toBeInTheDocument();
    expect(imgPokemon).toHaveAttribute('src', mockPokemon.image);
    expect(imgPokemon).toHaveAttribute('alt', `${mockPokemon.name} sprite`);
  });

  it(`Testando se o card do Pokémon indicado na
  Pokédex contém um link de navegação para exibir detalhes deste Pokémon`, () => {
    renderWithRouter(<Pokemon pokemon={ mockPokemon } isFavorite />);
    const linkMoreDetails = screen.getByRole('link', {
      name: TEXTMOREDETAILS,
    });
    expect(linkMoreDetails).toBeInTheDocument();

    expect(linkMoreDetails).toHaveAttribute('href', `/pokemons/${mockPokemon.id}`);
  });

  it(`Testando se ao clicar no link de navegação do Pokémon, 
  é feito o redirecionamento da aplicação para a página de detalhes de Pokémon`, () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', {
      name: TEXTMOREDETAILS,
    });
    expect(linkMoreDetails).toBeInTheDocument();

    userEvent.click(linkMoreDetails);

    const headingH2 = screen.getByRole('heading', {
      level: 2,
      name: `${mockPokemon.name} Details`,
    });
    expect(headingH2).toBeInTheDocument();
  });

  it(`Testando também se a URL exibida no navegador 
  tem o id do Pokémon cujos detalhes se deseja ver`, () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ mockPokemon } isFavorite />);
    const linkMoreDetails = screen.getByRole('link', {
      name: TEXTMOREDETAILS,
    });
    expect(linkMoreDetails).toBeInTheDocument();
    userEvent.click(linkMoreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${mockPokemon.id}`);
  });

  it('Testando se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', {
      name: TEXTMOREDETAILS,
    });
    expect(linkMoreDetails).toBeInTheDocument();

    userEvent.click(linkMoreDetails);

    const checkboxFavorite = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });
    expect(checkboxFavorite).toBeInTheDocument();

    userEvent.click(checkboxFavorite);

    const imgFavorite = screen.getByAltText(/favorite/);
    expect(imgFavorite).toBeInTheDocument();
    expect(imgFavorite).toHaveAttribute('src', '/star-icon.svg');
    expect(imgFavorite).toHaveAttribute('alt',
      `${mockPokemon.name} is marked as favorite`);
  });
});
