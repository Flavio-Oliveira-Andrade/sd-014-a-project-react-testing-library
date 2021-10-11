import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../components/renderWithRouter';
import App from '../App';

describe('Pokedex', () => {
  it('contains a h2 = "Encountered pokémons"', () => {
    renderWithRouter(<App />);

    const text = screen.getByText(/Encountered pokémons/i);
    expect(text).toBeDefined();
  });

  describe('shows the next pokémon when next button is clicked', () => {
    it('contains the text "Próximo pokémon"', () => {
      renderWithRouter(<App />);

      const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
      expect(nextButton).toBeDefined();
    });

    it('shows the first pokemon if it is on the last', () => {
      renderWithRouter(<App />);

      const fireButton = screen.getByRole('button', { name: /Fire/i });
      const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });

      userEvent.click(fireButton);
      let charmander = screen.getByText(/Charmander/i);
      expect(charmander).toBeDefined();

      userEvent.click(nextButton);
      const rapidesh = screen.getByText(/Rapidash/i);
      expect(rapidesh).toBeDefined();

      userEvent.click(nextButton);
      charmander = screen.getByText(/Charmander/i);
      expect(charmander).toBeDefined();
    });
  });

  it('shows only one pokémon at a time', () => {
    renderWithRouter(<App />);

    const pokesOnScreen = screen.getAllByTestId('pokemon-type');
    expect(pokesOnScreen).toHaveLength(1);
  });

  describe('has all the filter buttons', () => {
    it('has all the pokemon types buttons', () => {
      renderWithRouter(<App />);

      const TOTAL_TYPES = 7;
      const allSingleTypeButtons = screen.getAllByTestId('pokemon-type-button');
      expect(allSingleTypeButtons).toHaveLength(TOTAL_TYPES);
    });

    it('should only circulate on one type after button filter click', () => {
      renderWithRouter(<App />);

      const psychBtn = screen.getByRole('button', { name: /Psychic/i });
      userEvent.click(psychBtn);

      let currentPoke = screen.getByText(/Alakazam/i);
      expect(currentPoke).toBeDefined();

      const nextBtn = screen.getByRole('button', { name: /Próximo/i });
      userEvent.click(nextBtn);
      currentPoke = screen.getByText(/Mew/i);
      expect(currentPoke).toBeDefined();

      userEvent.click(nextBtn);
      currentPoke = screen.getByText(/Alakazam/i);
      expect(currentPoke).toBeDefined();
    });

    it('should have the same text as the pokemon type', () => {
      renderWithRouter(<App />);

      const psychicBtn = screen.getByRole('button', { name: /Psychic/i });
      userEvent.click(psychicBtn);
      const psychicTexts = screen.getAllByText(/Psychic/i);
      expect(psychicTexts).toHaveLength(2);
    });
    it('should always be visible', () => {
      renderWithRouter(<App />);

      const psychicBtn = screen.getByRole('button', { name: /Psychic/i });
      const allBtn = screen.getByRole('button', { name: /All/i });
      const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
      expect(allBtn).toBeDefined();
      userEvent.click(psychicBtn);
      expect(allBtn).toBeDefined();
      userEvent.click(nextButton);
      expect(allBtn).toBeDefined();
    });
  });

  describe('has a button to reset filters', () => {
    it('has a text on the reset button = "All"', () => {
      renderWithRouter(<App />);

      const allButton = screen.getByRole('button', { name: /All/i });
      expect(allButton).toBeDefined();
    });

    it('shows pokemons without filter when all button is clicked', () => {
      renderWithRouter(<App />);

      const allButton = screen.getByRole('button', { name: /All/i });
      const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });

      userEvent.click(allButton);
      let currentPoke = screen.getByText(/Pikachu/i);
      expect(currentPoke).toBeDefined();

      userEvent.click(nextButton);
      currentPoke = screen.getByText(/Charmander/i);
      expect(currentPoke).toBeDefined();
    });
    it('loads with filter: All ', () => {
      renderWithRouter(<App />);

      const nextButton = screen.getByRole('button', { name: /Próximo pokémon/i });
      let currentPoke = screen.getByText(/Pikachu/i);
      expect(currentPoke).toBeDefined();

      userEvent.click(nextButton);
      currentPoke = screen.getByText(/Charmander/i);
      expect(currentPoke).toBeDefined();
    });
  });
});
