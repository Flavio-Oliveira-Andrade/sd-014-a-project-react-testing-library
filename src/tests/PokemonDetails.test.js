import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import { PokemonDetails } from '../components';
import pokemons from '../data';
import App from '../App';

const id = { params: { id: '25' } };
const favorites = { 25: true };

describe('Teste o componente <PokemonDetails.js />', () => {
  test('A página deve conter um texto <name> Details', () => {
    renderWithRouter(
      <PokemonDetails
        match={ id }
        pokemons={ pokemons }
        isPokemonFavoriteById={ favorites }
      />,
    );
    const detailsText = screen.getByRole('heading', {
      level: 2,
      name: /details/i,
    });
    const summaryText = screen.getByRole('heading', {
      level: 2,
      name: /summary/i,
    });
    const summaryParagraph = screen.getByText(pokemons[0].summary);
    expect(summaryParagraph).toBeInTheDocument();
    expect(detailsText.innerHTML).toBe(`${pokemons[0].name} Details`);
    expect(summaryText).toBeInTheDocument();
  });

  test('se existe na página uma seção com os mapas contendo as localizações', () => {
    renderWithRouter(
      <PokemonDetails
        match={ id }
        pokemons={ pokemons }
        isPokemonFavoriteById={ favorites }
      />,
    );
    const locations = screen.getAllByRole('img', { name: /Pikachu location/i });
    const gameLocation = screen.getByRole('heading', {
      name: /game locations/i,
      level: 2,
    });
    expect(locations).toHaveLength(2);
    expect(gameLocation.innerHTML).toBe(
      `Game Locations of ${pokemons[0].name}`,
    );
    expect(locations[0].src).toBe(pokemons[0].foundAt[0].map);
    expect(locations[0].alt).toBe(`${pokemons[0].name} location`);
  });

  test('se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const detailsButton = screen.getByRole('link', {
      name: /More details/i,
    });
    userEvent.click(detailsButton);
    const checkboxLabel = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(checkboxLabel);
    const starIcon = screen.getByRole('img', {
      name: `${pokemons[0].name} is marked as favorite`,
    });
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
