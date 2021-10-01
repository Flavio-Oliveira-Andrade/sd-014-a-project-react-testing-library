import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';
import pokemons from '../data';
import App from '../App';

describe('Requisito 5', () => {
  test('Página contém um heading h2 com o texto Encountered pokémons', () => {
    const setIs = App.setIsPokemonFavoriteById();
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ setIs }
      />,
    );
    const h2 = screen.getByRole('heading', {
      name: 'Encountered pokémons',
    });
    expect(h2).toBeInTheDocument();
  });
  test('Próximos Pokémons da lista devem ser mostrados, '
  + 'um a um, ao clicar sucessivamente no botão', () => {
    const setIs = App.setIsPokemonFavoriteById();
    renderWithRouter(
      <Pokedex
        pokemons={ pokemons }
        isPokemonFavoriteById={ setIs }
      />,
    );
    const btnAll = screen.getByRole('button', {
      name: 'All',
    });
    expect(btnAll).toBeInTheDocument();
    pokemons.forEach((poke) => {
      const screenName = screen.getByTestId('pokemon-name');
      const pokeName = poke.name;
      expect(screenName).toHaveTextContent(pokeName);
      const btnNext = screen.getByText('Próximo pokémon');
      fireEvent.click(btnNext);
    });
    const screenName = screen.getByTestId('pokemon-name');
    const pokeName = pokemons[0].name;
     expect(screenName).toHaveTextContent(pokeName);
  });
  test('É mostrado apenas um Pokémon por vez', () => {

  });
});
