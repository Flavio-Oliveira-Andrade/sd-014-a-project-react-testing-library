import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './utilitary/renderWithRouter';
import FavoritePokemons from '../components';
import App from '../App';
import { FAVORITE_POKE, NEXT_POKE, HOME_PAGE,
  DETAILS_PAGE, FAVORITE_PAGE, FAVORITES_TOTAL } from './utilitary/antiMagicError';

describe('Tests FavoritePokemons component', () => {
  beforeEach(() => { renderWithRouter(<App />); });

  it('should render "No Favorite Pokémon" message', () => {
    const { history } = renderWithRouter(<FavoritePokemons />);
    history.push('/favorites');
    expect(screen.getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  it('should render favorites Pokémon cards', () => {
    fireEvent.click(screen.getByText('Pikachu'));
    fireEvent.click(screen.getByText(DETAILS_PAGE));
    fireEvent.click(screen.getByText(FAVORITE_POKE));
    fireEvent.click(screen.getByText(HOME_PAGE));
    fireEvent.click(screen.getByText(NEXT_POKE));
    fireEvent.click(screen.getByText(NEXT_POKE));
    fireEvent.click(screen.getByText('Caterpie'));
    fireEvent.click(screen.getByText(DETAILS_PAGE));
    fireEvent.click(screen.getByText(FAVORITE_POKE));
    fireEvent.click(screen.getByText(HOME_PAGE));
    fireEvent.click(screen.getByText(NEXT_POKE));
    fireEvent.click(screen.getByText(NEXT_POKE));
    fireEvent.click(screen.getByText(NEXT_POKE));
    fireEvent.click(screen.getByText(NEXT_POKE));
    fireEvent.click(screen.getByText('Alakazam'));
    fireEvent.click(screen.getByText(DETAILS_PAGE));
    fireEvent.click(screen.getByText(FAVORITE_POKE));
    fireEvent.click(screen.getByText(HOME_PAGE));
    fireEvent.click(screen.getByText(FAVORITE_PAGE));
    expect((screen.getAllByText(/More details/i))).toHaveLength(FAVORITES_TOTAL);
  });
});
