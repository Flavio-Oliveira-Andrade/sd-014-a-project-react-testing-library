import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from './auxiliary-tools/renderWithRouter';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';

describe('Pokémon.js component behaves correctly', () => {
  it('Displays the correct information inside the pokémon\'s card', () => {
    renderWithRouter(<App />);
    const pkmnPic = screen.getByRole('img', { name: 'Pikachu sprite' });
    const pkmnName = screen.getByTestId('pokemon-name');
    const pkmnType = screen.getByTestId('pokemon-type');
    const pkmnWeight = screen.getByTestId('pokemon-weight');
    const nextButton = screen.getByTestId('next-pokemon');

    pokemons.forEach((pkmn) => {
      expect(pkmnPic.src).toBe(pkmn.image);
      expect(pkmnName.innerHTML).toBe(pkmn.name);
      expect(pkmnType.innerHTML).toBe(pkmn.type);
      expect(pkmnWeight.innerHTML).toBe(
        `Average weight: ${
          `${pkmn.averageWeight.value
          } `
        }${pkmn.averageWeight.measurementUnit}`,
      );
      userEvent.click(nextButton);
    });
  });

  it('Displays a functional Link for more information about the pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const infoLink = screen.getByRole('link', { name: /more details/i });

    userEvent.click(infoLink);

    const { pathname } = history.location;
    expect(pathname).toBe(`/pokemons/${pokemons[0].id}`);
  });

  it('Displays star for favorited pokémon', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[1] } isFavorite />);
    const favStar = screen.getByAltText(/is marked as favorite/i);
    expect(favStar).toBeInTheDocument();
    expect(favStar.src).toBe('http://localhost/star-icon.svg');
    // expect(favStar.alt).toBe(`${pokemons[1].name} is marked as favorites`);
    expect(favStar.alt).toBe('Charmander is marked as favorite');
  });
});
