import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../services/renderWithRouter';
import pokemons from '../data';

describe('Testa o componente PokemonDetails.js', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetails);
  });

  it('Deveria exibir informações detalhadas do pokémon selecionado', () => {
    const { name, summary } = pokemons[0];
    const headDetails = screen.getByRole('heading', { leve: 2, name: `${name} Details` });
    expect(headDetails).toBeInTheDocument();
    const links = screen.getAllByRole('link');
    const linkLength = 3;
    expect(links).toHaveLength(linkLength);
    const headSummary = screen.getByRole('heading', { name: 'Summary' });
    expect(headSummary).toBeInTheDocument();
    const pokemonSummary = screen.getByText(summary);
    expect(pokemonSummary).toBeInTheDocument();
  });

  it('Deveria existir uma seção com os mapas contendo as localizações do pokémon', () => {
    const { name, foundAt } = pokemons[0];
    const locations = screen.getByRole('heading',
      { name: `Game Locations of ${name}` });
    expect(locations).toBeInTheDocument();
    foundAt.forEach(({ location, map }, index) => {
      const gameLocation = screen.getByText(location);
      expect(gameLocation).toBeInTheDocument();
      const imageLocation = screen.getAllByAltText(`${name} location`);
      expect(imageLocation[index].src).toBe(map);
    });
  });

  it('Deveria conseguir favoritar um pokémon através da página de detalhes', () => {
    const { name } = pokemons[0];
    const checkbox = screen.getByRole('checkbox',
      { name: 'Pokémon favoritado?' });
    expect(checkbox).toBeInTheDocument();
    userEvent.click(checkbox);
    const favoritePokemonStar = screen.getByAltText(`${name} is marked as favorite`);
    expect(favoritePokemonStar).toBeInTheDocument();
    userEvent.click(checkbox);
    expect(favoritePokemonStar).not.toBeInTheDocument();
  });
});
