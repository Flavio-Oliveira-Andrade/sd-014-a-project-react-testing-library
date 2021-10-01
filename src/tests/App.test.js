import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import RenderWithRouter from '../util/RenderWithRouter';

describe('testando <App />', () => {
  test('testando se existe o link "home", "About" e "Favorite Pokémons"', () => {
    RenderWithRouter(<App />);
    const getHome = screen.getByText('Home');
    const getAbout = screen.getByText('About');
    const getFavoritePokemon = screen.getByText('Favorite Pokémons');

    expect(getHome).toBeInTheDocument();
    expect(getAbout).toBeInTheDocument();
    expect(getFavoritePokemon).toBeInTheDocument();
  });
});
