import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Verifica o componente <Pokemon.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('Renderização correta do card com as infos dos Pokemons', () => {
    // - O nome correto do Pokémon deve ser mostrado na tela;
    const showingPokemonName = screen.getByTestId('pokemon-name').innerHTML;
    expect(showingPokemonName).toBe(pokemons[0].name);

    // - O tipo correto do pokémon deve ser mostrado na tela.
    const showingPokemonType = screen.getByTestId('pokemon-type').innerHTML;
    expect(showingPokemonType).toBe(pokemons[0].type);

    // - peso
    const showingPokemonWeight = screen.getByTestId('pokemon-weight').innerHTML;
    expect(showingPokemonWeight).toBe(
      `Average weight: ${pokemons[0]
        .averageWeight.value} ${pokemons[0].averageWeight.measurementUnit}`,
    );

    // - Img
    const showingPokemonImg = screen.getByRole('img');
    expect(showingPokemonImg.src).toContain(pokemons[0].image);
    const showingPokemonImgAlt = screen.getAllByAltText(`${pokemons[0].name} sprite`);
    expect(showingPokemonImgAlt.length).toBe(1);
  });

  test('link details', () => {
    const detailsBtn = screen.getByRole('link', { name: 'More details' });
    // referencia https://stackoverflow.com/questions/57827126/how-to-test-anchors-href-with-react-testing-library
    expect(detailsBtn).toHaveAttribute('href', `/pokemons/${pokemons[0].id}`);
  });

  test('ícone de estrela nos Pokémons favoritados', () => {
    const detailsBtn = screen.getByRole('link', { name: 'More details' });
    userEvent.click(detailsBtn);

    const favoriteCheck = screen.getByRole('checkbox');
    userEvent.click(favoriteCheck);

    const favorite = screen.getByRole('link', { name: 'Home' });
    userEvent.click(favorite);

    const star = screen.getByAltText(`${pokemons[0].name} is marked as favorite`);
    expect(star.src).toContain('/star-icon.svg');
    expect(star).toBeInTheDocument();
  });
});
