import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Testes do requisito 7', () => {
  it('Testa se mostra as informações detalhadas do Pokémon na tela', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);

    const nameDetails = screen.getByRole('heading', {
      level: 2,
      name: 'Pikachu Details',
    });

    const summaryH2 = screen.getByRole('heading', { level: 2, name: 'Summary' });
    const summary = screen.getByText(`${pokemons[0].summary}`);

    expect(nameDetails).toBeInTheDocument();
    expect(summaryH2).toBeInTheDocument();
    expect(summary).toBeInTheDocument();
    expect(linkDetails).not.toBeInTheDocument();
  });

  it('Testa se existe uma seção com os mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);

    const locationH2 = screen.getByRole('heading', {
      level: 2,
      name: /Game Locations of Pikachu/i,
    });
    const locations = screen.getAllByAltText('Pikachu location');

    expect(locationH2).toBeInTheDocument();
    expect(locations.length).toBe(pokemons[0].foundAt.length);
    locations.forEach((image, index) => {
      expect(image).toHaveAttribute('src', pokemons[0].foundAt[index].map);
    });
  });

  it('Testa se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);

    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);

    const favoriteText = screen.getByLabelText('Pokémon favoritado?');
    const favorite = screen.getByRole('checkbox', { name: /pokémon favoritado?/i });
    userEvent.click(favorite);

    expect(favoriteText).toBeInTheDocument();
    expect(favorite).toBeInTheDocument();

    const favorited = screen.getByAltText(/is marked as favorite/i);

    expect(favorited).toBeInTheDocument();
    userEvent.click(favorite);
    expect(favorited).not.toBeInTheDocument();
  });
});
