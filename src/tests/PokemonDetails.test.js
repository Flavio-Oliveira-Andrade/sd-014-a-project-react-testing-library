import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('Teste o componente <PokemonDetails.js />', () => {
  test('Teste se as informações detalhadas do Pokémon', () => {
    renderWithRouter(<App />);
    const { name, summary } = pokemons[0];
    const details = screen.getByRole('link', { name: /details/i });
    userEvent.click(details);
    expect(details).not.toBeInTheDocument();

    const nameDatails = screen.getByRole('heading', {
      level: 2,
      name: `${name} Details`,
    });
    expect(nameDatails).toBeInTheDocument();

    const headingsummary = screen.getByRole('heading', { level: 2, name: /summary/i });
    expect(headingsummary).toBeInTheDocument();

    const summaryText = screen.getByText(summary);
    expect(summaryText).toBeInTheDocument();
  });

  test('Teste se existe na página uma seção com os mapas', () => {
    const { name, foundAt } = pokemons[0];
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /details/i });
    expect(details).toBeInTheDocument();

    userEvent.click(details);
    const locationElement = screen.getByRole('heading', {
      level: 2,
      name: `Game Locations of ${name}`,
    });
    expect(locationElement).toBeInTheDocument();

    foundAt.forEach(({ location, map }, index) => {
      const image = screen.getAllByRole('img', { name: `${name} location` });
      const localizacao = screen.getByText(location);
      expect(localizacao).toBeInTheDocument();
      expect(image[index]).toBeInTheDocument();
      expect(image[index]).toHaveAttribute('src', map);
    });
  });

  test('Teste se o usuário pode favoritar um pokémon através'
  + 'da página de detalhes.', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /details/i });
    userEvent.click(details);

    const pokeFavorite = screen.getByLabelText(/Pokémon favoritado/i);
    expect(pokeFavorite).toBeInTheDocument();

    userEvent.click(pokeFavorite);

    const favoritado = screen.getByRole('img', { name: /is marked as favorite/i });
    expect(favoritado).toBeInTheDocument();

    userEvent.click(pokeFavorite);
    expect(favoritado).not.toBeInTheDocument();
  });
});
