import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../support/renderWithRouter';
import FavoritePokemons from '../components/FavoritePokemons';
import App from '../App';
import { MORE_DETAILS, NEXT_POKEMON, FAVORITE,
  PAGE_FAVORITES, PAGE_HOME } from '../support/noMagicStuff';

describe('Testa favoritePokemons', () => {
  beforeEach(() => { renderWithRouter(<App />); });

  it('should have the text No favorite pokemon found', () => {
    const { history } = renderWithRouter(<FavoritePokemons />);
    history.push('/favorites');
    expect(screen.getByText('No favorite pokemon found')).toBeInTheDocument();
  });

  it('should have all favorite pokemon cards', () => {
    const TOTAL_FAVORITES = 3;
    fireEvent.click(screen.getByText('Pikachu'));
    fireEvent.click(screen.getByText(MORE_DETAILS));
    fireEvent.click(screen.getByText(FAVORITE));
    fireEvent.click(screen.getByText(PAGE_HOME));
    fireEvent.click(screen.getByText(NEXT_POKEMON));
    fireEvent.click(screen.getByText(NEXT_POKEMON));
    fireEvent.click(screen.getByText('Caterpie'));
    fireEvent.click(screen.getByText(MORE_DETAILS));
    fireEvent.click(screen.getByText(FAVORITE));
    fireEvent.click(screen.getByText(PAGE_HOME));
    fireEvent.click(screen.getByText(NEXT_POKEMON));
    fireEvent.click(screen.getByText(NEXT_POKEMON));
    fireEvent.click(screen.getByText(NEXT_POKEMON));
    fireEvent.click(screen.getByText(NEXT_POKEMON));
    fireEvent.click(screen.getByText('Alakazam'));
    fireEvent.click(screen.getByText(MORE_DETAILS));
    fireEvent.click(screen.getByText(FAVORITE));
    fireEvent.click(screen.getByText(PAGE_HOME));
    fireEvent.click(screen.getByText(PAGE_FAVORITES));
    expect((screen.getAllByText(/More details/i))).toHaveLength(TOTAL_FAVORITES);
  });
});
