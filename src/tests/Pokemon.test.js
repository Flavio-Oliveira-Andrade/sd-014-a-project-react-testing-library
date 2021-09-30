import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './services/renderWithRouter';
import { Pokemon } from '../components';

const MOCKED_PKM = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
};
const { averageWeight: { measurementUnit, value }, id, image, name, type } = MOCKED_PKM;

describe('tests Pokemon.js component', () => {
  it('renders a pokemon card containing the pokemon\'s name, type, weight and image',
    () => {
      renderWithRouter(<Pokemon pokemon={ MOCKED_PKM } isFavorite />);

      const pkmName = screen.getByTestId('pokemon-name');
      expect(pkmName).toBeInTheDocument();
      expect(pkmName).toHaveTextContent(name);

      const pkmType = screen.getByTestId('pokemon-type');
      expect(pkmType).toBeInTheDocument();
      expect(pkmType).toHaveTextContent(type);

      const pkmWeight = screen.getByTestId('pokemon-weight');
      expect(pkmWeight).toBeInTheDocument();
      expect(pkmWeight).toHaveTextContent(`Average weight: ${value} ${measurementUnit}`);

      const pkmImage = screen.getByAltText(/pikachu sprite/i);
      expect(pkmImage).toBeInTheDocument();
      expect(pkmImage).toHaveAttribute('src', image);
      expect(pkmImage).toHaveAttribute('alt', `${name} sprite`);
    });

  it('renders a "More details" link', () => {
    renderWithRouter(<Pokemon pokemon={ MOCKED_PKM } isFavorite />);

    const detailsLink = screen.getByRole('link');
    expect(detailsLink).toBeInTheDocument();
    expect(detailsLink).toHaveAttribute('href', `/pokemons/${id}`);
    // o elemento a é considerado como link pelo react
    // ref https://stackoverflow.com/questions/57827126/how-to-test-anchors-href-with-react-testing-library
  });

  it('redirects to PokemonDetails.js on "More details" click', () => {
    const { history } = renderWithRouter(<Pokemon pokemon={ MOCKED_PKM } isFavorite />);

    const detailsLink = screen.getByRole('link');

    userEvent.click(detailsLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe(`/pokemons/${id}`);
  });

  it('renders the favorited icon', () => {
    renderWithRouter(<Pokemon pokemon={ MOCKED_PKM } isFavorite />);

    const favIcon = screen.getByAltText(/pikachu is marked as favorite/i);
    expect(favIcon).toBeInTheDocument();
    expect(favIcon).toHaveAttribute('src', '/star-icon.svg');
    expect(favIcon).toHaveAttribute('alt', `${name} is marked as favorite`);
  });
});
