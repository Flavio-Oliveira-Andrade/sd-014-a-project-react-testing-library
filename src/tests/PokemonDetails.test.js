import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import pokemons from '../data';
import historyFunction from '../utils/historyFunction';
import App from '../App';

describe('Teste o componente PokemonDetails', () => {
  test('Testa se as informações detalhadas do Pokémon são mostradas.', () => {
    historyFunction(<App />);
    const details = screen.getByText(/more details/i);
    userEvent.click(details);

    const detailsPokemon = screen.getByRole('heading', {
      name: `${pokemons[0].name} Details`,
    });
    expect(detailsPokemon).toBeInTheDocument();
    expect(details).not.toBeInTheDocument();

    const detailsTitle = screen.getByRole('heading', {
      level: 2,
      name: /Summary/i,
    });
    expect(detailsTitle).toBeInTheDocument();
    const summary = screen.getByText(pokemons[0].summary);
    expect(summary).toBeInTheDocument();
  });
  test('Testa se existe uma seção'
  + 'com os mapas contendo as localizações do pokémon', () => {
    historyFunction(<App />);
    const details = screen.getByText(/more details/i);
    userEvent.click(details);
    const detailsText = screen.getByRole('heading', {
      level: 2,
      name: `Game Locations of ${pokemons[0].name}`,
    });
    expect(detailsText).toBeInTheDocument();
    const map = screen.getAllByAltText(`${pokemons[0].name} location`);
    expect(map.length).toBe(pokemons[0].foundAt.length);
    expect(map[0]).toHaveAttribute('src', pokemons[0].foundAt[0].map);
  });
  it('Testa se o usuário pode favoritar um pokémon na página de detalhes.', () => {
    historyFunction(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);

    const checkbox = screen.getByLabelText(/pokémon favoritado?/i);
    expect(checkbox).toBeInTheDocument();

    userEvent.click(checkbox);
    const favoriteIcon = screen.getByRole('img', { name: /is marked as favorite/i });
    expect(favoriteIcon).toBeInTheDocument();
    userEvent.click(checkbox);
    expect(favoriteIcon).not.toBeInTheDocument();
  });
});
