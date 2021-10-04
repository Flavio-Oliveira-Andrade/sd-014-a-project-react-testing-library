import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';

describe('Verifica o componente "Pokemon.js"', () => {
  it('Deveria ter um card com informações de um determinado pokémon', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toHaveTextContent(/Pikachu/i);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toHaveTextContent(/electric/i);
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toHaveTextContent(/Average weight: 6.0 kg/i);
    const img = screen.getByAltText('Pikachu sprite');
    expect(img.src).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('Deveria ter um link de detalhes direcionando para a pagina de detalhes do pokémon',
    () => {
      const { history } = renderWithRouter(<App />);
      const moreDetails = screen.getByRole('link', { name: /More Details/i });
      userEvent.click(moreDetails);
      const url = history.location.pathname;
      expect(url).toBe('/pokemons/25');
      const checkbox = screen.getByRole('checkbox', { checked: false });
      userEvent.click(checkbox);
      const favoritePokemon = screen.getByAltText('Pikachu is marked as favorite');
      expect(favoritePokemon.src).toBe('http://localhost/star-icon.svg');
    });
});
