import userEvent from '@testing-library/user-event';
import React from 'react';
import { screen } from '@testing-library/react';

import pokemons from '../data';
import App from '../App';
import renderWithRouter from '../components/Rotas';

describe('Testando Pokemon Deatails', () => {
  beforeEach(() => { renderWithRouter(<App />); });
  const { name, summary, foundAt } = pokemons[0];

  it('Mostrando detalhes do seu pokemon', () => {
    const detalhes = screen.getByText(/More details/i);
    userEvent.click(detalhes);
    expect(screen.getByText(`${name} Details`)).toBeInTheDocument();
    expect(detalhes).not.toBeInTheDocument();
    expect(screen.getByRole('heading', {
      level: 2,
      name: /Summary/i,
    })).toBeInTheDocument();
    expect(screen.getByText(summary)).toBeInTheDocument();
  });
  it('pokemon mapas', () => {
    userEvent.click(screen.getByText(/More details/i));
    expect(screen.getByRole('heading', {
      level: 2,
      name: `Game Locations of ${name}`,
    })).toBeInTheDocument();

    foundAt.forEach((loc, index) => {
      const imgLocation = screen.getAllByRole('img', {
        name: `${name} location`,
      });
      expect(imgLocation[index]).toHaveAttribute('src', loc.map);
      expect(imgLocation[index]).toHaveAttribute('alt', `${name} location`);
    });
  });

  it('Favoritar Pokemons', () => {
    userEvent.click(screen.getByText(/More details/i));
    userEvent.click(screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    }));
    expect(screen.getByRole('img', {
      name: `${name} is marked as favorite`,
    })).toHaveAttribute('src', '/star-icon.svg');
  });
});
