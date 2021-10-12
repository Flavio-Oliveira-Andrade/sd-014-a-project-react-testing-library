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
      map: 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png',
    },
    {
      location: 'Kanto Power Plant',
      map: 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png',
    },
  ],
  summary: 'This intelligent Pokémon roasts hard berries with electricity to'
  + ' make them tender enough to eat.',
};

const { name, summary, foundAt } = pokemonInfo;

describe('Testa o componente <PokemonDetails.js />', () => {
  beforeEach(() => renderWithRouter(<App />));
  it('Testa se as informações detalhadas do Pokémon selecionado são mostradas.', () => {
    const moreDetailsBtn = screen.getByRole('link', { name: /more details/i });
    userEvent.click(moreDetailsBtn);

    const pokemonName = screen.getByText(`${name} Details`);
    expect(pokemonName).toBeInTheDocument();
    expect(moreDetailsBtn).not.toBeInTheDocument();

    const h2 = screen.getByRole('heading', { name: 'Summary', level: 2 });
    expect(h2).toBeInTheDocument();

    const sumario = screen.getByRole('heading', { level: 2,
      name: /summary/i });
    const detailsTxt = screen.getByText(`${summary}`);
    expect(sumario).toBeInTheDocument();
    expect(detailsTxt).toBeInTheDocument();
  });

  it('Testa se existem os mapas contendo as localizações do pokémon', () => {
    const moreDetailsBtn = screen.getByText(/more details/i);
    userEvent.click(moreDetailsBtn);

    const h2 = screen.getByRole(
      'heading', { name: `Game Locations of ${name}`, level: 2 },
    );
    expect(h2).toBeInTheDocument();

    const maps = screen.getAllByAltText(/pikachu location/i);
    expect(maps).toHaveLength(2);

    expect(maps[0].src).toBe(`${foundAt[0].map}`);
    expect(maps[1].src).toBe(`${foundAt[1].map}`);

    expect(maps[0]).toHaveAttribute('alt', `${name} location`);
    expect(maps[1]).toHaveAttribute('alt', `${name} location`);

    expect(maps[0]).toBeInTheDocument();
    expect(maps[1]).toBeInTheDocument();
  });

  it('Testa se o usuário pode favoritar um pokémon pela página de detalhes.', () => {
    const moreDetailsBtn = screen.getByText(/more details/i);
    userEvent.click(moreDetailsBtn);

    const checkbox = screen.getByRole('checkbox', { name: 'Pokémon favoritado?' });
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
