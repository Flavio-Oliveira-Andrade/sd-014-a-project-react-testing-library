import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('test component about', () => {
  it('should have informations about pokedex', () => {
    renderWithRouter(<About />);
    const pokedexText = screen.getByText(/This application simulates a Pokédex/i);
    expect(pokedexText).toBeInTheDocument();
  });

  it('should have a h2 with text About Pokédex', () => {
    renderWithRouter(<About />);
    const textAbout = screen.getByText('About Pokédex');
    expect(textAbout).toBeInTheDocument();
  });

  it('should have 2 paragraphs', () => {
    renderWithRouter(<About />);
    const textPokedex = screen.getByText(
      /This application simulates a Pokédex, a digital/i,
      /encyclopedia containing all Pokémons/i,
    );
    const textPokedex2 = screen.getByText(
      'One can filter Pokémons by type, and see more details for each one of them',
    );
    expect(textPokedex).toBeInTheDocument();
    expect(textPokedex2).toBeInTheDocument();
  });

  it('should have an image', () => {
    renderWithRouter(<About />);
    const image = screen.getByAltText('Pokédex');
    expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
