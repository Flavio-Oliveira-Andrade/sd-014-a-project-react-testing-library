import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../utils/renderWithRouter';
import PokemonDetails from '../components/PokemonDetails';
import pokemons from '../data';

const OBJ_OF_ID = {
  4: false,
  10: false,
  23: false,
  25: false,
  65: false,
  78: false,
  143: false,
  148: false,
  151: false,
};

const match = {
  params: {
    id: '25',
  },
};

describe('Teste o componente <PokemonDetails />', () => {
  it('se as informações detalhadas do Pokémon selecionado são mostradas na tela', () => {
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ OBJ_OF_ID }
      match={ match }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ jest.fn }
    />);
    expect(screen.getByText(/pikachu details/i)).toBeInTheDocument();
    expect(screen.getByRole('heading', {
      level: 2,
      name: /summary/i,
    })).toBeInTheDocument();
    expect(screen.getByText(/this intelligent pokémon/i)).toBeInTheDocument();
  });

  it('se existe uma seção com os mapas contendo as localizações do pokémon', () => {
    const LOCALIZATION_URL = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';

    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ OBJ_OF_ID }
      match={ match }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ jest.fn }
    />);
    expect(screen.getByRole('heading', {
      level: 2,
      name: /game locations of pikachu/i,
    })).toBeInTheDocument();
    expect(screen.getAllByRole('img', {
      name: /pikachu location/i,
    })[0]).toHaveAttribute('src', LOCALIZATION_URL);
  });

  it('se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<PokemonDetails
      isPokemonFavoriteById={ OBJ_OF_ID }
      match={ match }
      pokemons={ pokemons }
      onUpdateFavoritePokemons={ jest.fn }
    />);

    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByText(/pokémon favoritado/i)).toBeInTheDocument();
  });
});
