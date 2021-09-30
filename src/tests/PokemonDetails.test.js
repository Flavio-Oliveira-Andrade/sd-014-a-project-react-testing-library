import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import pokemons from '../data';
import App from '../App';

describe('Testa o componente <PokemonDetails.js />', () => {
  it('Testa se as informações detalhadas do Pokémon são mostradas.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const moreDetails = screen.getByText(/more details/i);
    fireEvent.click(moreDetails);

    const nameDetails = screen.getByRole('heading', {
      name: `${pokemons[0].name} Details`,
    });
    expect(nameDetails).toBeInTheDocument();

    expect(moreDetails).not.toBeInTheDocument();

    const summaryTitle = screen.getByRole('heading', {
      level: 2,
      name: /Summary/i,
    });
    expect(summaryTitle).toBeInTheDocument();

    const summary = screen.getByText(pokemons[0].summary);
    expect(summary).toBeInTheDocument();
  });

  it('Testa se existe uma seção com os mapas contendo as localizações do pokémon', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    fireEvent.click(moreDetails);

    const heading = screen.getByRole('heading', {
      level: 2,
      name: `Game Locations of ${pokemons[0].name}`,
    });
    expect(heading).toBeInTheDocument();

    const maps = screen.getAllByAltText(`${pokemons[0].name} location`);
    expect(maps.length).toBe(pokemons[0].foundAt.length);
    expect(maps[0]).toHaveAttribute('src', pokemons[0].foundAt[0].map);
  });

  it('Testa se o usuário pode favoritar um pokémon na página de detalhes.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const moreDetails = screen.getByRole('link', { name: /more details/i });
    fireEvent.click(moreDetails);

    const checkbox = screen.getByLabelText(/pokémon favoritado?/i);
    expect(checkbox).toBeInTheDocument();

    fireEvent.click(checkbox);
    const favoriteIcon = screen.getByRole('img', { name: /is marked as favorite/i });
    expect(favoriteIcon).toBeInTheDocument();
    fireEvent.click(checkbox);
    expect(favoriteIcon).not.toBeInTheDocument();
  });
});
