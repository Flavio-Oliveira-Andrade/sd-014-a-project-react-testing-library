import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import pokemons from '../data';
import renderWithRouter from '../renderWithRouter';

describe('Verifica o componente PokemonDetails', () => {
  it('Verifica se as informações detalhadas do Pokémon '
    + 'selecionado são mostradas na tela.', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetails);
    expect(screen.getByText(`${pokemons[0].name} Details`)).toBeInTheDocument();
    expect(moreDetails).not.toBeInTheDocument();
    const summary = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });
    expect(summary).toBeInTheDocument();
    expect(screen.getByText(`${pokemons[0].summary}`)).toBeInTheDocument();
  });
  it('Verifica se existe na página uma seção com os mapas '
    + 'contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: 'More details' });
    userEvent.click(moreDetails);
    const locationText = screen.getByRole('heading', {
      level: 2,
      name: `Game Locations of ${pokemons[0].name}`,
    });
    expect(locationText).toBeInTheDocument();
    const locations = screen.getAllByAltText(`${pokemons[0].name} location`);
    pokemons[0].foundAt.map((location, index) => expect(locations[index])
      .toHaveAttribute('src', location.map));
  });
  it('Verifica se o usuário pode favoritar um pokémon '
    + 'através da página de detalhes.', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetails);
    userEvent.click(screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    }));
    expect(screen.getByRole('img', {
      name: `${pokemons[0].name} is marked as favorite`,
    })).toHaveAttribute('src', '/star-icon.svg');
  });
});
