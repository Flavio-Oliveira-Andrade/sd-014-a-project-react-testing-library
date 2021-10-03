import React from 'react';
import { screen } from '@testing-library/react';
import fireEvent from '@testing-library/user-event';
import renderWithRouter from '../services/RenderWithRouter';
import App from '../App';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';

describe('Testa o componente <Pokemon.js/>', () => {
  test('Testa se é renderizado um card com determinado pokémon.', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toHaveTextContent('Pikachu');
    const type = screen.getByTestId('pokemon-type');
    expect(type).toHaveTextContent('Electric');
    const weight = screen.getByTestId('pokemon-weight');
    expect(weight).toHaveTextContent(/average weight: 6\.0 kg/i);
    const imag = screen.getByRole('img', { name: /pikachu sprite/i }).src;
    expect(imag).toBe('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  test('Testa se o Pokédex contém link para exibir detalhes deste Pokémon', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    expect(details).toBeInTheDocument();
    fireEvent.click(details);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  test('Testa se existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />); // linha 23 favorite
    const fave = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(fave.src).toBe('http://localhost/star-icon.svg');
    expect(fave.alt).toBe(`${pokemons[0].name} is marked as favorite`);
  });
});
