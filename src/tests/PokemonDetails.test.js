import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import App from '../App';
import renderWithRouter from './util/renderWithRouter';

const charmanderPage = '/pokemons/4';

describe('Teste do componente <PokemonDetails.js />', () => {
  it('Verifique se as informações detalhadas do Pokémon'
    + ' selecionado são mostradas na tela.', () => {
    const { history } = renderWithRouter(<App />);
    const detailsLink = screen.getByRole('link', { name: /more details/i });
    history.push(charmanderPage);
    const pokemonName = screen.getByRole('heading', {
      level: 2,
      name: /charmander details/i,
    });
    const summaryText = screen.getByRole('heading', {
      level: 2,
      name: /summary/i,
    });
    const detailsText = screen.getByText(
      /The flame on its tail shows the strength of its life force/i,
    );

    expect(pokemonName).toBeInTheDocument();
    expect(summaryText).toBeInTheDocument();
    expect(detailsLink).not.toBeInTheDocument();
    expect(detailsText).toBeInTheDocument();
  });
  it('Verifique se existe na página uma seção com os'
    + ' mapas contendo as localizações do pokémon', () => {
    const alolaMapLink = 'https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png';
    const NUMBER_OF_MAPS = 4;
    const { history } = renderWithRouter(<App />);
    history.push(charmanderPage);
    const locationTitle = screen.getByRole('heading', {
      level: 2,
      name: /Game Locations of Charmander/i,
    });
    const pokemonLocationMap = screen.getAllByAltText(/charmander location/i);
    expect(locationTitle).toBeInTheDocument();
    expect(pokemonLocationMap).toHaveLength(NUMBER_OF_MAPS);
    expect(pokemonLocationMap[0].src).toBe(alolaMapLink);
  });
  it('Verifique se o usuário pode favoritar um pokémon'
    + ' através da página de detalhes.', () => {
    const { history } = renderWithRouter(<App />);
    history.push(charmanderPage);
    const favoriteCheckbox = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });
    expect(favoriteCheckbox).toBeInTheDocument();
    userEvent.click(favoriteCheckbox);
    const isFavorite = screen.getByAltText(/charmander is marked as favorite/i);
    expect(isFavorite).toBeInTheDocument();
    userEvent.click(favoriteCheckbox);
    expect(isFavorite).not.toBeInTheDocument();
  });
});
