import React from 'react';

import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Pokemon from '../components/Pokemon';
import renderWithRouter from '../utils/RenderWithRoute';
import pokemon from '../data';

const favoritesID = {
  25: true,
  0: false,
};
// Assitido pelo crack Doug04
describe('testando componente Pokemon', () => {
  test('O nome correto do Pokémon deve ser mostrado na tela', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemon[0] }
      isPokemonFavoriteById={ favoritesID[pokemon[0].id] }
    />);
    const pokeName = screen.getByText(/pikachu/i);
    expect(pokeName).toBeInTheDocument();
  });

  test('O tipo correto do pokémon deve ser mostrado na tela.', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemon[0] }
      isPokemonFavoriteById={ favoritesID[pokemon[0].id] }
    />);
    const pokeType = screen.getByTestId('pokemon-type');
    expect(pokeType).toBeInTheDocument();
    expect(pokeType.textContent).toBe(pokemon[0].type);
  });
  test('O peso médio do pokémon deve ser exibido com um texto ', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemon[0] }
      isPokemonFavoriteById={ favoritesID[pokemon[0].id] }
    />);
    const pokePeso = screen.getByText(`Average weight: ${pokemon[0]
      .averageWeight.value} ${pokemon[0].averageWeight.measurementUnit}`);
    expect(pokePeso).toBeInTheDocument();
  });
  test('A imagem do Pokémon deve ser exibida ', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemon[0] }
      isPokemonFavoriteById={ favoritesID[pokemon[0].id] }
    />);
    const pokeIMG = screen.getByRole('img', { name: `${pokemon[0].name} sprite` });
    expect(pokeIMG).toBeInTheDocument();
    expect(pokeIMG).toHaveAttribute('alt', `${pokemon[0].name} sprite`);
    expect(pokeIMG).toHaveAttribute('src', pokemon[0].image);
  });
  // concluido com assitencia de Renatta, na monitoria matinal grupal.
  test('Se o card do Pokémon indicado na Pokédex contém um link ', () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemon[0] }
      isPokemonFavoriteById={ favoritesID[pokemon[0].id] }
    />);
    const pokeLink = screen.getByText('More details');

    userEvent.click(pokeLink);
    expect(history.location.pathname).toBe(`/pokemons/${pokemon[0].id}`);
  });
  test('Favoritado deve ter uma imagem com o atributo'
  + 'src contendo o caminho /star-icon.svg ', () => {
    renderWithRouter(<Pokemon
      pokemon={ pokemon[0] }
      isFavorite={ favoritesID[pokemon[0].id] }
    />);

    const pokeStar = screen
      .getByRole('img', { name: /is marked as favorite/i });
    expect(pokeStar).toHaveAttribute('src', '/star-icon.svg');
    expect(pokeStar).toHaveAttribute('alt', `${pokemon[0].name} is marked as favorite`);
  });
});
