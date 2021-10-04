import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from '../App';
import pokemons from '../data';

const getBtn = (text) => {
  return screen.getByRole('button', {
    name: text,
  });
}

const pokeFilter = (btnType, pokemonType) => {
  const nextBtn = getBtn('Próximo pokémon');

  userEvent.click(btnType);
  const displayedPokemon = screen.getByTestId('pokemon-type');
   
  expect(displayedPokemon.textContent).toMatch(btnType.textContent);
  
  const filteredPokemons = pokemons.filter((pokemon) => pokemon.type === pokemonType);
  filteredPokemons.forEach((pokemon) => {
    const pokemonScreen = screen.getByText(pokemon.name);
    expect(pokemonScreen).toBeInTheDocument();
    userEvent.click(nextBtn);
  });
}

describe('Testa o componente "Pokedex"', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    const pokedexHeading = screen.getByRole('heading', {
      level:2,
      name: 'Encountered pokémons',
    });

    expect(pokedexHeading).toBeInTheDocument();
  });

  test('Testa a lista de pokemons e o botão "proximo pokemon" funcionam corretamente', () => {
    render(<MemoryRouter><App /></MemoryRouter>);

    const allFilterBtn = screen.getByRole('button', {
      name: 'All',
    });

    userEvent.click(allFilterBtn);
    
    const nextBtn = screen.getByTestId('next-pokemon');
    const pokemonDataTest = screen.getAllByTestId('pokemon-name');
   
    const arrayPokemons = pokemons.reduce((acc, pokemon, ) => {
      const pokemonName = screen.getByText(pokemon.name);
      acc.push(pokemon);
      expect(pokemonName).toBeInTheDocument();
      expect(pokemonDataTest.length).toBe(1);
      userEvent.click(nextBtn);
      return acc;
     }, []);
    
    const firstPokeName = arrayPokemons[0].name;
    const firstNameScreen = screen.getByText(firstPokeName);
    expect(firstNameScreen).toBeInTheDocument();
    expect(pokemonDataTest.length).toBe(1);

  });

  test('Testa os botões de filtro de pokemons', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    const allBtn = getBtn('All');
    const eletricBtn = getBtn('Electric');
    const fireBtn = getBtn('Fire');
    const bugBtn = getBtn('Bug');
    const poisonBtn = getBtn('Poison');
    const psychicBtn = getBtn('Psychic');
    const normalBtn = getBtn('Normal');
    const dragonBtn = getBtn('Dragon');
    
    expect(allBtn).toBeInTheDocument();
    expect(eletricBtn).toBeInTheDocument();
    expect(fireBtn).toBeInTheDocument();
    expect(bugBtn).toBeInTheDocument();
    expect(poisonBtn).toBeInTheDocument();
    expect(psychicBtn).toBeInTheDocument();
    expect(normalBtn).toBeInTheDocument();
    expect(dragonBtn).toBeInTheDocument();    
  });

  test('Testa cada filtro e seu funcionamento', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    const eletricBtn = getBtn('Electric');
    const fireBtn = getBtn('Fire');
    const bugBtn = getBtn('Bug');
    const poisonBtn = getBtn('Poison');
    const psychicBtn = getBtn('Psychic');
    const normalBtn = getBtn('Normal');
    const dragonBtn = getBtn('Dragon');
        
    userEvent.click(eletricBtn);
    const displayedPokemon = screen.getByTestId('pokemon-type');
    expect(displayedPokemon.textContent).toMatch(eletricBtn.textContent);
    
    pokeFilter(eletricBtn, 'Electric');
    pokeFilter(fireBtn, 'Fire');
    pokeFilter(bugBtn, 'Bug');
    pokeFilter(poisonBtn, 'Poison');
    pokeFilter(psychicBtn, 'Psychic');
    pokeFilter(normalBtn, 'Normal');
    pokeFilter(dragonBtn, 'Dragon');
  });
});
