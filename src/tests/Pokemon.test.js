import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import { Pokemon } from '../components';
import pokemons from '../data';

const MOCKED_PKM = pokemons[0];
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
