import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import data from '../data';
import { FavoritePokemons } from '../components';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente "Pokedex"', () => {
  test('testes sem fitros', () => {
    renderWithRouter(<App />);
    const pokemonType = screen.getByTestId('pokemon-type');
    const heading = screen.getByRole('heading', { name: 'Encountered pokémons' });
    expect(heading).toBeInTheDocument();
    const nextPokemon = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(nextPokemon).toBeInTheDocument();
    const allBtn = screen.getByText(/all/i);
    data.map((pokemon) => {
      const { averageWeight: { value, measurementUnit } } = pokemon;
      expect(screen.getByTestId('pokemon-name')).toHaveTextContent(pokemon.name);
      expect(pokemonType).toHaveTextContent(pokemon.type);
      expect(screen.getByTestId('pokemon-weight'))
        .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);
      expect(screen.getByRole('img').src).toBe(pokemon.image);
      expect(screen.getByText(/more details/i)).toBeInTheDocument();
      expect(allBtn).toBeInTheDocument();
      return userEvent.click(nextPokemon);
    });
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(screen.getByTestId('pokemon-weight'))
      .toHaveTextContent('Average weight: 6.0 kg');
  });
  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);
    const allButtons = screen.getAllByTestId('pokemon-type-button');
    const numberOfCategories = 7;
    const buttonFireType = screen.getByRole('button', { name: /Fire/i });
    userEvent.click(buttonFireType);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent('Fire');
    expect(allButtons.length).toBe(numberOfCategories);
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const buttonFireType = screen.getByRole('button', { name: /Fire/i });
    const allBtn = screen.getByText(/all/i);
    userEvent.click(buttonFireType);
    userEvent.click(allBtn);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
  });
});
