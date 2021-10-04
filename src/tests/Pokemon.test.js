import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';
import Pokemon from '../components/Pokemon';

describe('Pokemon.js', () => {
  it('Teste se é rndrzd um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    expect((screen.getByTestId('pokemon-name').innerHTML)).toBe('Pikachu');
    expect((screen.getByTestId('pokemon-type').innerHTML)).toBe('Electric');
    expect((screen.getByTestId('pokemon-weight')
      .innerHTML)).toBe('Average weight: 6.0 kg');
    const img = screen.getByRole('img', { name: 'Pikachu sprite' });
    expect(img.src).toBe(pokemons[0].image);
    expect(img.alt).toBe(`${pokemons[0].name} sprite`);
  });
  it('Teste o link de detalhes', () => {
    const { history } = renderWithRouter(<App />);
    const link = screen.getByRole('link', { name: 'More details' });
    expect(link.href).toBe('http://localhost/pokemons/25');
    userEvent.click(link);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<Pokemon pokemon={ pokemons[0] } isFavorite />);
    expect((screen.getByRole('img', { name: 'Pikachu is marked as favorite' }))
      .src).toContain('/star-icon.svg');
    expect((screen.getByRole('img', { name: 'Pikachu is marked as favorite' })).alt)
      .toContain(`${pokemons[0].name} is marked as favorite`);
  });
});
