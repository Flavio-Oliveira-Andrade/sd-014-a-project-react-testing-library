import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import pokemons from '../data';
import App from '../App';
import { readFavoritePokemonIds } from '../services/pokedexService';

const testPokemon = pokemons[0];
const DETAILS_PATH = `/pokemons/${testPokemon.id}`;

describe('Testa o componente <PokemonDetails.js />', () => {
  test('Testa se as informações detalhadas do Pokémon selecionado são mostradas na tela.',
    () => {
      const { history } = renderWithRouter(<App />);
      const { name, summary } = testPokemon;
      history.push(DETAILS_PATH);

      expect(screen.getByRole('heading', { level: 2, name: `${name} Details` }))
        .toBeInTheDocument();

      expect(screen.queryByRole('link', { name: 'More details' })).toBeNull();

      expect(screen.getByRole('heading', { level: 2, name: 'Summary' }))
        .toBeInTheDocument();

      expect(screen.getByText(summary)).toBeInTheDocument();
    });

  test('Testa se existe uma seção com os mapas contendo as localizações do pokémon',
    () => {
      const { history } = renderWithRouter(<App />);
      const { name, foundAt } = testPokemon;
      history.push(DETAILS_PATH);

      const locationHeader = screen.getByRole('heading',
        { level: 2, name: `Game Locations of ${name}` });
      expect(locationHeader).toBeInTheDocument();

      const locations = screen.getAllByAltText(`${name} location`);

      expect(locations.length).toBe(foundAt.length);

      foundAt.forEach(({ location, map }, index) => {
        expect(screen.getByText(location)).toBeInTheDocument();
        expect(locations[index]).toHaveAttribute('src', map);
      });
    });
  test('Teste se o usuário pode favoritar um pokémon através da página de detalhes.',
    () => {
      const { history } = renderWithRouter(<App />);
      const { id } = testPokemon;
      history.push(DETAILS_PATH);

      const favButton = screen.getByLabelText('Pokémon favoritado?');
      expect(favButton).toBeInTheDocument();

      userEvent.click(favButton);
      let favs = readFavoritePokemonIds();

      expect(favs.length).toBe(1);
      expect(favs[0]).toBe(id);

      userEvent.click(favButton);
      favs = readFavoritePokemonIds();
      expect(favs.length).toBe(0);
    });
});
