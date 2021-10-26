import React from 'react';
import { screen } from '@testing-library/react';
import '@testing-library/jest-dom';

import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Verifica o componente <PokemonDetails.js />', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });
  const moreDetails = 'More details';

  test('informações detalhadas do Pokémon selecionado', () => {
    const detailsBtn = screen.getByRole('link', { name: moreDetails });
    userEvent.click(detailsBtn);

    const title = screen.getByRole('heading', {
      level: 2,
      name: `${pokemons[0].name} Details`,
    });
    expect(title).toBeInTheDocument();
    expect(detailsBtn).not.toBeInTheDocument();
    const summary = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(summary).toBeInTheDocument();
    const resume = screen.getByText(pokemons[0].summary, {
      selector: 'p',
    });
    expect(resume).toBeInTheDocument();
  });

  test('mapas e localizações dos Pokémos', () => {
    const detailsBtn = screen.getByRole('link', { name: moreDetails });
    userEvent.click(detailsBtn);

    const titleLocation = screen.getByRole('heading', {
      level: 2,
      name: `Game Locations of ${pokemons[0].name}`,
    });
    expect(titleLocation).toBeInTheDocument();
    pokemons[0].foundAt.forEach((loc, index) => {
      const locationName = screen.getByText(loc.location);
      expect(locationName).toBeInTheDocument();
      const locationImg = screen.getAllByAltText(`${pokemons[0].name} location`);
      expect(locationImg[index]).toBeInTheDocument();
      expect(locationImg[index].src).toContain(loc.map);
    });
  });

  test('mapas e localizações dos Pokémos', () => {
    const detailsBtn = screen.getByRole('link', { name: moreDetails });
    userEvent.click(detailsBtn);

    const favoriteCheck = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(favoriteCheck);

    const star = screen.getByAltText(
      `${pokemons[0].name} is marked as favorite`,
    );
    expect(star).toBeInTheDocument();

    userEvent.click(favoriteCheck);
    expect(star).not.toBeInTheDocument();
  });
});
