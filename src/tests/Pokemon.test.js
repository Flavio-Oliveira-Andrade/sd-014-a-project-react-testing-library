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
    expect(pkmnName).toHaveTextContent('Pikachu');
    const pkmnType = screen.getByTestId('pokemon-type');
    expect(pkmnType).toHaveTextContent('Electric');
    const pkmnWeight = screen.getByTestId('pokemon-weight');
    expect(pkmnWeight).toHaveTextContent('Average weight: 6.0 kg');
    const pkmnImg = screen.getByRole('img', { name: /pikachu sprite/i }).src;
    expect(pkmnImg).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
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
    const favorite = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favorite.src).toBe('http://localhost/star-icon.svg');
    expect(favorite.alt).toBe(`${pokemons[0].name} is marked as favorite`);
  });
});
