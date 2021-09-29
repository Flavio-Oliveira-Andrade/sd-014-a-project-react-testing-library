import React from 'react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';

describe('test component about', () => {
  it('should have informations about pokedex', () => {
    const { getByText } = renderWithRouter(<About />);
    const pokedexText = getByText(/This application simulates a Pokédex/i);
    expect(pokedexText).toBeInTheDocument;
  });

  it('should have a h2 with text About Pokédex', () => {
    const { getByText } = renderWithRouter(<About />);
    const textAbout = getByText('About Pokédex');
    expect(textAbout).toBeInTheDocument;
  });

  it('should have 2 paragraphs', () => {
    const { getByText } = renderWithRouter(<About />);
    const textPokedex = getByText(
      "This application simulates a Pokédex, a digital encyclopedia containing all Pokémons"
    );
    const textPokedex2 = getByText(
      "One can filter Pokémons by type, and see more details for each one of them"
    );
    expect(textPokedex).toBeInTheDocument;
    expect(textPokedex2).toBeInTheDocument;
  });

  it('should have an image', () => {
    const { getByAltText } = renderWithRouter(<About />);
    const image = getByAltText('Pokédex');
    expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});