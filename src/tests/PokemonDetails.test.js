import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(ui, { wrapper: BrowserRouter });
};

const pokemonInfo = {
  id: 25,
  name: 'Pikachu',
  type: 'Electric',
  averageWeight: {
    value: '6.0',
    measurementUnit: 'kg',
  },
  image: 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png',
  moreInfo: 'https://bulbapedia.bulbagarden.net/wiki/Pikachu_(Pok%C3%A9mon)',
  foundAt: [
    {
      location: 'Kanto Viridian Forest',
      map1: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map2: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary: 'This intelligent Pokémon roasts hard berries with electricity'
  + ' to make them tender enough to eat.',
};

const { name, summary, foundAt } = pokemonInfo;

describe('Testa o componente <PokemonDetails.js />', () => {
  beforeEach(() => renderWithRouter(<App />));
  it('Testa se as informações detalhadas do Pokémon selecionado são mostradas.', () => {
    const moreDetailsBtn = screen.getByText(/more details/i);
    userEvent.click(moreDetailsBtn);

    const pokemonName = screen.getByText(`${name} Details`);
    expect(pokemonName).toBeVisible();
    expect(moreDetailsBtn).not.toBeInTheDocument();

    const h2 = screen.getByRole('heading', { name: 'Summary' }, { level: 2 });
    expect(h2).toBeInTheDocument();

    const sumario = screen.getByText(`${summary}`);
    expect(sumario).toBeInTheDocument();
  });

  it('Testa se existem os mapas contendo as localizações do pokémon', () => {
    const moreDetailsBtn = screen.getByText(/more details/i);
    userEvent.click(moreDetailsBtn);

    const h2 = screen.getByRole(
      'heading', { name: `Game Locations of ${name}` }, { level: 2 },
    );
    expect(h2).toBeInTheDocument();

    const mapsHeading1 = screen.getByText(/Viridian Forest/i);
    expect(mapsHeading1).toBeInTheDocument();
    const mapsHeading2 = screen.getByText(/Power Plant/i);
    expect(mapsHeading2).toBeInTheDocument();

    const map1 = screen.getByTestId('map Kanto Viridian Forest');
    const map2 = screen.getByTestId('map Kanto Power Plant');

    expect(map1).toBeInTheDocument();
    expect(map1.src).toBe(`${foundAt[0].map1}`);

    expect(map2).toBeInTheDocument();
    expect(map2.src).toBe(`${foundAt[1].map2}`);

    expect(map1).toHaveAttribute('alt', `${name} location`);
    expect(map2).toHaveAttribute('alt', `${name} location`);
  });

  it('Testa se o usuário pode favoritar um pokémon pela página de detalhes.', () => {
    const moreDetailsBtn = screen.getByText(/more details/i);
    userEvent.click(moreDetailsBtn);

    const checkbox = screen.getByTestId('fav-box');
    expect(checkbox).toBeInTheDocument();

    userEvent.click(checkbox);
    const favIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(favIcon).toBeInTheDocument();

    userEvent.click(checkbox);
    expect(favIcon).not.toBeInTheDocument();

    const labelFav = screen.getByTestId('favorite-check');
    expect(labelFav).toHaveTextContent('Pokémon favoritado?');
  });
});
