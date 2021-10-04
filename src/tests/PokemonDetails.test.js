import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Teste o componente <PokemonDetails.js />', () => {
  it('Teste se as informações detalhadas do Pokémon '
  + 'selecionado são mostradas na tela', () => {
    renderWithRouter(
      <App />,
    );
    const pokemonDetailsLink = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(pokemonDetailsLink);

    expect(pokemonDetailsLink).not.toBeInTheDocument();

    const pokemonDetailsTitle = screen.getByRole('heading', {
      name: 'Pikachu Details',
    });
    expect(pokemonDetailsTitle).toBeInTheDocument();

    const summaryText = screen.getByRole('heading', {
      level: 2,
      name: 'Summary',
    });

    expect(summaryText).toBeInTheDocument();

    const resumePokemon = screen.getByText(/This intelligent Pokémon roasts hard/i);

    expect(resumePokemon).toBeInTheDocument();
  });

  it('Teste se existe na página uma seção com os mapas contendo'
  + ' as localizações do pokémon', () => {
    renderWithRouter(
      <App />,
    );

    const pokemonDetailsLink = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(pokemonDetailsLink);

    const gameLocations = screen.getByRole('heading', {
      level: 2,
      name: 'Game Locations of Pikachu',
    });

    expect(gameLocations).toBeInTheDocument();

    const locationPokemon = screen.getAllByAltText(/Pikachu location/i);

    expect(locationPokemon[0]).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
  });

  it('Teste se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(
      <App />,
    );

    const pokemonDetailsLink = screen.getByRole('link', {
      name: /more details/i,
    });

    userEvent.click(pokemonDetailsLink);

    const starMarked = screen.getByRole('checkbox');

    userEvent.click(starMarked);

    const favoritePokemonText = screen.getByLabelText(/Pokémon favoritado?/i);

    userEvent.click(favoritePokemonText);

    expect(favoritePokemonText).toBeInTheDocument();
  });
});
