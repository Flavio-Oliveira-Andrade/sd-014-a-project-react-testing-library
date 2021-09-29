import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../support/renderWithRouter';
import About from '../components/About';

describe('Tests the About component', () => {
  beforeEach(() => { renderWithRouter(<About />); });

  it('should have information about Pokedex', () => {
    expect(screen.getByText(/digital encyclopedia/i)).toBeInTheDocument();
  });

  it('should have the Pokedex heading', () => {
    expect(screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    })).toBeInTheDocument();
  });

  it('should have two paragraphs with info about Pokedex', () => {
    expect((screen.getByText(/This application simulates a Pokédex/i)))
      .toBeInTheDocument();
    expect((screen.getByText(/One can filter Pokémons by type/i)))
      .toBeInTheDocument();
  });

  it('should have a specific Pokedex image', () => {
    expect((screen.getByRole('img')).src)
      .toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
