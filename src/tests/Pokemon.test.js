import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Pokemon } from '../components';
import renderWithRouter from '../renderWithRouter';

const pokemon = {
  id: 148,
  name: 'Dragonair',
  type: 'Dragon',
  averageWeight: {
    value: '16.5',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/2/2c/Spr_5b_148.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Dragonair_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Johto Route 45',
      map: 'https://cdn2.bulbagarden.net/upload/2/21/Johto_Route_45_Map.png',
    },
    {
      location: 'Johto Dragon\'s Den',
      map: 'https://cdn2.bulbagarden.net/upload/1/1e/Johto_Dragons_Den_Map.png',
    },
  ],
  summary: `They say that if it emits an aura from its whole body,
   the weather will begin to change instantly.`,
};

describe('Verifica se é renderizado um card com as informações de determinado pokémon',
  () => {
    test('Deve ser renderizado um card com as informações do pokémon', () => {
      const { history } = renderWithRouter(<Pokemon pokemon={ pokemon } isFavorite />);
      const { averageWeight: { value, measurementUnit } } = pokemon;
      const linkMoreDetails = screen.getByText(/more details/i);
      expect(screen.getByText(pokemon.name)).toBeInTheDocument();
      expect(screen.getByText(pokemon.type)).toBeInTheDocument();
      expect(screen.getByText(`Average weight: ${value} ${measurementUnit}`))
        .toBeInTheDocument();
      expect(screen.getByAltText('Dragonair sprite'))
        .toHaveAttribute('src', pokemon.image);
      userEvent.click(linkMoreDetails);
      expect(history.location.pathname).toBe(`/pokemons/${pokemon.id}`);
      expect(screen.getByAltText(`${pokemon.name} is marked as favorite`))
        .toHaveAttribute('src', '/star-icon.svg');
    });
  });
