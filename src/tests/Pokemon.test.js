import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Pokemon.js test', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const pkmnName = screen.getByTestId('pokemon-name');
    expect(pkmnName).toBeInTheDocument();
    const pkmnType = screen.getByTestId('pokemon-type');
    expect(pkmnType).toBeInTheDocument();
    const pkmnWeight = screen.getByTestId('pokemon-weight');
    expect(pkmnWeight).toBeInTheDocument();
    const pkmnImg = screen.getByRole('img');
    expect(pkmnImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  test('Teste se o card do pkmn contém um link que possui a URL /pokemons/<id>', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    expect(detailsLink).toBeInTheDocument();
    fireEvent.click(detailsLink);
    const { pathname } = history.location; // Verifica se estamos na página correta.
    expect(pathname).toBe('/pokemons/25');
  });
  test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const starIcon = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(starIcon).toBeInTheDocument();
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
