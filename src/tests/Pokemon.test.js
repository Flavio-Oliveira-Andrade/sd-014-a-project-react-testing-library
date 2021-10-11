import React from 'react';
import { fireEvent, screen } from '@testing-library/react';

import App from '../App';
import Pokemon from '../components/Pokemon';
// Obrigado ao Tiago Sathler e Rod(Rodolfo) Pinheiro fiz code review do repositório deste ultimo

import renderWithRouter from './renderWithRouter';

import pokemons from '../data';

describe('6 - Teste o Componente Pokemon.js', () => {
  const moreDetailsText = 'More details';

  test('6.1- Testa se é renderizado um card com as informações de um pokémon', () => {
    const testPokemon = pokemons[0];
    const { averageWeight: testPokemonWeight } = testPokemon;

    renderWithRouter(<Pokemon pokemon={ testPokemon } isFavorite={ false } />);

    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pokemonImage = screen.getByAltText(`${testPokemon.name} sprite`);

    expect(pokemonName.textContent).toBe(testPokemon.name);
    expect(pokemonType.textContent).toBe(testPokemon.type);
    expect(pokemonWeight.textContent).toBe(
      `Average weight: ${testPokemonWeight.value} ${testPokemonWeight.measurementUnit}`,
    );
    expect(pokemonImage.src).toBe(
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
    );
  });

  test('6.2 - Testa se é renderizado um link de mais detalhes', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: moreDetailsText });
    // https://www.w3schools.com/jsref/jsref_regexp_zeromore.asp
    // https://stackoverflow.com/questions/31750721/what-does-page-matches-regex-mean
    const linkRegex = new RegExp('.*/pokemons/25');
    // In regular expression syntax the period . mean "match any character" and the asterisk
    // * means "any number of times".
    // So it basically means match anything (even an empty string). It shouldn't filter out anything.

    expect(detailsLink.textContent).toBe(moreDetailsText);
    expect(detailsLink.href).toMatch(linkRegex);

    fireEvent.click(detailsLink);

    const {
      location: { pathname },
    } = history;
    const header = screen.getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });

    expect(header.textContent).toBe('Pikachu Details');
    expect(pathname).toBe('/pokemons/25');
  });

  test('6.3 Testa se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    const detailsLink = screen.getByRole('link', { name: moreDetailsText });

    fireEvent.click(detailsLink);

    const favoritePokemon = screen.getByRole('checkbox');

    fireEvent.click(favoritePokemon);

    history.push('/');

    const star = screen.getByAltText('Pikachu is marked as favorite');

    expect(star).toBeInTheDocument();
    expect(star.src).toMatch(/\/star-icon.svg/);
  });
});
