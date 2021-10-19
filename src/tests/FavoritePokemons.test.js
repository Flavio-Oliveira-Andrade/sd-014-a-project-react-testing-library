import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderPath from './utilities/renderPath';

describe('Testa o funcionamento do componente FavoritePokemons', () => {
  test('Testa se é exibida na tela a mensagem de "No favorite pokemon found"', () => {
    renderPath('/favorites');

    const favoritesNotFound = screen.getByText('No favorite pokemon found');

    expect(favoritesNotFound).toBeInTheDocument();
  });

  test('Testa se é exibido na tela o pokemon quando é favoritado', () => {
    renderPath('/pokemons/25');

    const buttonFavorite = screen.getByText('Pokémon favoritado?');

    userEvent.click(buttonFavorite);

    const linkToFavorites = screen.getByRole('link', {
      name: 'Favorite Pokémons',
    });

    userEvent.click(linkToFavorites);

    const pokemons = screen.getAllByRole('img');

    expect(pokemons[0]).toBeInTheDocument();
  });
});
