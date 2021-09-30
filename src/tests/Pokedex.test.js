import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './auxiliary-tools/renderWithRouter';
// import pokemons from '../data';

describe('Pokedex is working properly', () => {
  it('Displays an \'h2\' element with the text \'Encountered pokémons\'', () => {
    renderWithRouter(<App />);
    const message = screen.getByRole('heading',
      { name: /Encountered pokémon/i, level: 2 });
    expect(message).toBeInTheDocument();
  });

  it('Displays next pokémon when the button \'Próximo pokémon\' is clicked', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByTestId('next-pokemon');

    // pokemons.forEach((pkmn) => {
    //   const thisPkmn = screen.getByText(pkmn.name); // <<<< NEEDS TO BE CASE INSENSITIVE
    //   expect(thisPkmn).toBeInTheDocument();
    //   userEvent.click(nextButton);
    // }

    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
    expect(nextButton.innerHTML).toBe('Próximo pokémon');

    userEvent.click(nextButton);

    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();
    expect(nextButton.innerHTML).toBe('Próximo pokémon');
  });

  it('Displays one Pokémon at a time', () => {
    renderWithRouter(<App />);
    const pkmnWeight = screen.getAllByText(/Average weight/i);
    const pkmnPic = screen.getAllByRole('img');

    expect(pkmnWeight).toHaveLength(1);
    expect(pkmnPic).toHaveLength(1);
  });

  it('Filter buttons are present and working', () => {
    renderWithRouter(<App />);
    const filterButtons = screen.getAllByTestId('pokemon-type-button');
    filterButtons.forEach((type, index) => {
      expect(type).not.toEqual(filterButtons[index + 1]);
    });
    expect(filterButtons[0]).toBeInTheDocument();
  });

  it('Clicking \'All\' resets filters and defaults to first Pokémon', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: /All/i });
    const poisonButton = screen.getByRole('button', { name: /Poison/i });
    const nextButton = screen.getByTestId('next-pokemon');
    const pikachu = screen.getByText(/pikachu/i);

    expect(allButton).toBeInTheDocument();

    userEvent.click(poisonButton);
    userEvent.click(allButton);

    expect(pikachu).toBeInTheDocument();

    userEvent.click(nextButton);
    userEvent.click(allButton);

    expect(pikachu).toBeInTheDocument();
  });
});
