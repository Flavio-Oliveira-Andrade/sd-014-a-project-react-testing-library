import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Testa componente Pokedex.js', () => {
  test('Testa se há o heading "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const encounteredPokemonsHeading = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });

    expect(encounteredPokemonsHeading).toBeInTheDocument();
  });

  test('Testa se é exibido o próximo pokemon ao clicar no botão "Próximo pokémon', () => {
    renderWithRouter(<App />);

    const nextPokemonButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    expect(nextPokemonButton).toBeInTheDocument();

    userEvent.click(nextPokemonButton);
    const pokemonCharmander = screen.getByText(/charmander/i);
    expect(pokemonCharmander).toBeInTheDocument();

    userEvent.click(nextPokemonButton);
    const pokemonCaterpie = screen.getByText(/caterpie/i);
    expect(pokemonCaterpie).toBeInTheDocument();

    userEvent.click(nextPokemonButton);
    const pokemonEkans = screen.getByText(/ekans/i);
    expect(pokemonEkans).toBeInTheDocument();

    userEvent.click(nextPokemonButton);
    const pokemonAlakazam = screen.getByText(/alakazam/i);
    expect(pokemonAlakazam).toBeInTheDocument();

    userEvent.click(nextPokemonButton);
    const pokemonMew = screen.getByText(/mew/i);
    expect(pokemonMew).toBeInTheDocument();

    userEvent.click(nextPokemonButton);
    const pokemonRapidash = screen.getByText(/rapidash/i);
    expect(pokemonRapidash).toBeInTheDocument();

    userEvent.click(nextPokemonButton);
    const pokemonSnorlax = screen.getByText(/snorlax/i);
    expect(pokemonSnorlax).toBeInTheDocument();

    userEvent.click(nextPokemonButton);
    const pokemonDragonair = screen.getByText(/dragonair/i);
    expect(pokemonDragonair).toBeInTheDocument();

    userEvent.click(nextPokemonButton);
    const pokemonPikachu = screen.getByText(/pikachu/i);
    expect(pokemonPikachu).toBeInTheDocument();
  });

  test('Testa se é exibido apenas um pokemon por vez', () => {
    renderWithRouter(<App />);

    const moreDetailsLink = screen.getByRole('link', { name: /more details/i });

    expect(moreDetailsLink).toBeInTheDocument();
  });

  test(' Testa se a Pokédex contém os botões de filtro', () => {
    renderWithRouter(<App />);

    const allFilterButton = screen.getByRole('button', { name: /all/i });
    const eletricFilterButton = screen.getByRole('button', { name: /electric/i });
    const fireFilterButton = screen.getByRole('button', { name: /fire/i });
    const bugFilterButton = screen.getByRole('button', { name: /bug/i });
    const poisonFilterButton = screen.getByRole('button', { name: /poison/i });
    const psychicFilterButton = screen.getByRole('button', { name: /psychic/i });
    const normalFilterButton = screen.getByRole('button', { name: /normal/i });
    const dragonFilterButton = screen.getByRole('button', { name: /dragon/i });

    const dataTestId = 'data-testid';
    const pokemonTypeButton = 'pokemon-type-button';

    expect(allFilterButton).toBeInTheDocument();
    expect(eletricFilterButton).toHaveAttribute(dataTestId, pokemonTypeButton);
    expect(fireFilterButton).toHaveAttribute(dataTestId, pokemonTypeButton);
    expect(bugFilterButton).toHaveAttribute(dataTestId, pokemonTypeButton);
    expect(poisonFilterButton).toHaveAttribute(dataTestId, pokemonTypeButton);
    expect(psychicFilterButton).toHaveAttribute(dataTestId, pokemonTypeButton);
    expect(normalFilterButton).toHaveAttribute(dataTestId, pokemonTypeButton);
    expect(dragonFilterButton).toHaveAttribute(dataTestId, pokemonTypeButton);

    userEvent.click(fireFilterButton);

    const pokemonCharmander = screen.getByText(/charmander/i);
    expect(pokemonCharmander).toBeInTheDocument();

    const nextPokemonButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });

    userEvent.click(nextPokemonButton);

    const pokemonRapidash = screen.getByText(/rapidash/i);
    expect(pokemonRapidash).toBeInTheDocument();
  });

  test('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);

    const allFilterButton = screen.getByRole('button', { name: /all/i });
    expect(allFilterButton).toBeInTheDocument();

    userEvent.click(allFilterButton);

    const pokemonPikachu = screen.getByText(/pikachu/i);
    const nextPokemonButton = screen.getByRole('button', {
      name: /próximo pokémon/i,
    });
    expect(pokemonPikachu).toBeInTheDocument();
    expect(nextPokemonButton).not.toHaveAttribute('disabled');
  });
});
