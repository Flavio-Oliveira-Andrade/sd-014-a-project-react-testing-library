import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';

describe(' Teste o componente <Pokemon.js />', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    const img = screen.getByRole('img', { name: 'Pikachu sprite' });
    expect(img.src).toBe(pokemons[0].image);
    expect(img.alt).toBe(`${pokemons[0].name} sprite`);
    const pokemonName = screen.getByTestId('pokemon-name').innerHTML;
    expect(pokemonName).toBe('Pikachu');
    const pokemonType = screen.getByTestId('pokemon-type').innerHTML;
    expect(pokemonType).toBe('Electric');
    const pokemonWeight = screen.getByTestId('pokemon-weight').innerHTML;
    expect(pokemonWeight).toBe('Average weight: 6.0 kg');
  });

  test('se o card do Pokémon indicado na Pokédex contém um link de navegação', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: 'More details' });
    expect(link.href).toBe('http://localhost/pokemons/25');
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    const star = screen.getByRole('img', { name: 'Pikachu is marked as favorite' });
    expect(star).toHaveAttribute('src', '/star-icon.svg');
    expect(star).toHaveAttribute('alt', `${pokemons[0].name} is marked as favorite`);
  });
});
