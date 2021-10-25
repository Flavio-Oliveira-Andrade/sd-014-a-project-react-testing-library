import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  beforeEach(() => renderWithRouter(<App />));
  test('se as infos detalhadas do Pokémon selecionado são mostradas na tela', () => {
    const moreDetails = screen.getByText(/More details/);
    userEvent.click(moreDetails);
    const pokeDetails = screen.getByText(/Pikachu Details/);
    expect(pokeDetails).toBeInTheDocument();
    const heading = screen.getByRole('heading', { name: 'Summary', level: 2 });
    expect(heading).toBeInTheDocument();
    const summary = screen.getByText(/this intelligent Pokémon roasts hard berries wit/i);
    expect(summary).toBeInTheDocument();
  });

  test('se na página tem uma seção com os mapas contendo as localizações do poke', () => {
    const moreDetails = screen.getByText(/More details/);
    userEvent.click(moreDetails);
    const gameLocations = screen.getByRole(
      'heading', { name: 'Game Locations of Pikachu', level: 2 },
    );
    expect(gameLocations).toBeInTheDocument();
    const locationImgs = screen.getAllByRole('img', { name: 'Pikachu location' });
    expect(locationImgs).toHaveLength(2);
    const firstImg = screen.getByText('Kanto Viridian Forest');
    expect(firstImg).toBeInTheDocument();
    const secondImg = screen.getByText('Kanto Power Plant');
    expect(secondImg).toBeInTheDocument();
    const bothLocations = screen.getAllByRole('img', { name: 'Pikachu location' });
    expect(bothLocations[0]).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(bothLocations[1]).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png');
  });

  test('se o usuário pode favoritar um pokémon através da página de detalhes', () => {
    const moreDetails = screen.getByText(/More details/);
    userEvent.click(moreDetails);
    const favoriteMark = screen.getByRole('checkbox');
    expect(favoriteMark).toBeInTheDocument();
    userEvent.click(favoriteMark);
    const favoritedStar = screen.getByAltText(/pikachu is marked as favorite/i);
    expect(favoritedStar).toBeInTheDocument();

    userEvent.click(favoriteMark);
    expect(favoriteMark).not.toBeChecked();

    const favoriteLabel = screen.getByLabelText('Pokémon favoritado?');
    expect(favoriteLabel).toBeInTheDocument();
  });
});
