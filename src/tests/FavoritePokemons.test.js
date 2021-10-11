import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import App from '../App';
import FavoritePokemons from '../components/FavoritePokemons';
import pokemons from '../data';

describe('Tests the FavoritePokemons component', () => {
  it('should render a message if no favorite pokemon added', () => {
    renderWithRouter(<FavoritePokemons />);

    const MESSAGE = /no favorite pokemon found/i;
    const message = screen.getByText(MESSAGE);
    expect(message).toBeInTheDocument();
  });

  pokemons.forEach(({ id, name }) => {
    it(`should render the ${name} card when added`, () => {
      const { history } = renderWithRouter(<App />);

      history.push(`pokemons/${id}`);
      const add = screen.getByRole('checkbox');
      expect(add).toBeInTheDocument();
      userEvent.click(add);

      history.push('/favorites');
      const proofCard = screen.getByText(name);
      expect(proofCard).toBeInTheDocument();
    });
  });
});
