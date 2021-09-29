import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { PokemonDetails } from '../components';

const pokemons = [
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
    summary: `This intelligent Pokémon roasts 
    hard berries with electricity to make them tender enough to eat.`,
  },
];

const isPokemonFavoriteById = (change) => ({ 25: change });

describe('Testes do componente "PokemonDetails"', () => {
  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela',
    () => {
      renderWithRouter(<PokemonDetails
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ () => '' }
        isPokemonFavoriteById={ isPokemonFavoriteById(true) }
        match={ { params: { id: '25' } } }
      />);
      expect(screen.getByText(`${pokemons[0].name} Details`)).toBeInTheDocument();
      expect(screen.queryByRole('link', { name: /More details/i }))
        .not.toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2, name: 'Summary' }))
        .toBeInTheDocument();
      expect(screen.getByText(/This intelligent Pokémon roasts/i)).toBeInTheDocument();
    });
  test('Teste se existe na página uma seção com os mapas contendo as localizações',
    () => {
      renderWithRouter(<PokemonDetails
        pokemons={ pokemons }
        onUpdateFavoritePokemons={ () => '' }
        isPokemonFavoriteById={ isPokemonFavoriteById(true) }
        match={ { params: { id: '25' } } }
      />);
      expect(screen.getByRole('heading',
        { level: 2, name: `Game Locations of ${pokemons[0].name}` }));
      pokemons[0].foundAt.map((location) => {
        expect(screen.getByText(location.location)).toBeInTheDocument();
        return expect(screen.getAllByAltText('Pikachu location')
          .find((img) => img.src === location.map)).toBeInTheDocument();
      });
    });
  test('Teste se o usuário pode favoritar um pokémon através da página de detalhes',
    () => {
      const { history } = renderWithRouter(<App />);
      userEvent.click(screen.getByText(/more details/i));
      const favorite = screen.getByLabelText(/Pokémon favoritado?/);
      const favoriteImg = screen
        .queryByAltText(`${pokemons[0].name} is marked as favorite`);
      expect(favorite).toBeInTheDocument();
      expect(favoriteImg).not.toBeInTheDocument();
      userEvent.click(favorite);
      expect(screen.getByAltText(`${pokemons[0].name} is marked as favorite`))
        .toBeInTheDocument();
      history.push('/favorites');
      expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    });
});
