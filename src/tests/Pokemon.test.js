import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Testando o Card Pokémon', () => {
  test('Se o Card renderiza informações do Pokemon', () => {
    renderWithRouter(<App />);
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    const pikachuSprite = screen.getByAltText('Pikachu sprite');
    expect(pokemonName).toHaveTextContent('Pikachu');
    expect(pokemonType).toHaveTextContent('Electric');
    expect(pokemonWeight).toHaveTextContent('Average weight: 6.0 kg');
    expect(pikachuSprite).toBeInTheDocument();
    expect(pikachuSprite).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  test('Se o Card possui um link para mais detalhes do Pokémon', () => {
    renderWithRouter(<App />);
    const moreDetailsLink = screen.getByText('More details');
    expect(moreDetailsLink).toHaveAttribute('href', '/pokemons/25');
  });

  test('Se o link \'More Details\' está direcionando para o local correto', () => {
    const { history } = renderWithRouter(<App />);
    userEvent.click(screen.getByText(/more details/i));
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });

  test('Se o Card possui um ícone de estrela nos Pokémons favoritados', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByText(/more details/i));
    userEvent.click(screen.getByRole('checkbox'));
    const favoritedPikachu = screen.getByAltText('Pikachu is marked as favorite');
    expect(favoritedPikachu).toHaveProperty('src', 'http://localhost/star-icon.svg');
  });
});
