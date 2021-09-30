import React from 'react';
import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import renderWithRouter from '../utils/renderWithRouter';
import Pokemon from '../components/Pokemon';
import pokemons from '../data';
import isFavoriteById from './mock/mockFavorites';

describe('', () => {
  const { name, type, id, image,
    averageWeight: { value, measurementUnit } } = pokemons[0];
  it('should ', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ isFavoriteById[id] }
      showDetailsLink
    />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const imgOfPokemon = screen.getByAltText(`${name} sprite`);
    expect(pokemonName.innerHTML).toBe(name);
    expect(pokemonType.innerHTML).toBe(type);
    expect(pokemonWeight.innerHTML).toBe(`Average weight: ${value} ${measurementUnit}`);
    expect(imgOfPokemon.src).toBe(image);
  });
  it('o card do Pokémon indicado na Pokédex contém um link de'
  + ' navegação para exibir detalhes deste Pokémon. O link deve possuir'
  + ' a URL /pokemons/<id>, onde <id> é o id do Pokémon exibido;', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ isFavoriteById[id] }
      showDetailsLink
    />);
    const linkDetails = screen.getByRole('link', { name: 'More details' });
    expect(linkDetails.href).toBe('http://localhost/pokemons/25');
  });
  it('ao clicar no link de navegação do Pokémon, é feito o redirecionamento da'
  + ' aplicação para a página de detalhes de Pokémon.', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ isFavoriteById[id] }
      showDetailsLink
    />);
    const linkDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(linkDetails);
    expect(history.location.pathname).toBe(`/pokemons/${id}`);
  });
  it('should ', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemons[0] }
      isFavorite={ isFavoriteById[id] }
      showDetailsLink
    />);
    const favoriteImg = screen.getByAltText(`${name} is marked as favorite`);
    expect(favoriteImg).toBeInTheDocument();
    expect(favoriteImg.src).toBe('http://localhost/star-icon.svg');
  });
});
