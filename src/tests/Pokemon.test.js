import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Req 5 pokemon.test', () => {
  test('checks if the correct pokemon is rendered on screen;', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getByText(/Pikachu/i);
    expect(pokemon).toBeInTheDocument();
  });

  test('checks if the rendered pokemon element is the correct one', () => {
    renderWithRouter(<App />);
    const pokemonElement = screen.getAllByText(/Electric/i);
    expect(pokemonElement).toHaveLength(2);
  });

  test('checks if the pokemon weight is rendered', () => {
    renderWithRouter(<App />);
    const pokemonWeight = screen.getByText('Average weight: 6.0 kg');
    expect(pokemonWeight).toBeInTheDocument();
  });

  test('checks if the pokemon image is rendered', () => {
    renderWithRouter(<App />);
    const pokemonThumbnail = screen.getByRole('img', { name: 'Pikachu sprite' });
    expect(pokemonThumbnail.src).toStrictEqual('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('checks the pokemon card', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /More Details/i });
    expect(details).toBeInTheDocument();

    userEvent.click(details);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
    const favorite = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    expect(favorite).toBeInTheDocument();

    userEvent.click(favorite);
    const star = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(star.src).toBe('http://localhost/star-icon.svg');
  });
});
