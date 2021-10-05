import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Test <About.js /> component', () => {
  it('should contain a heading (h2) with the text "About Pokédex"', () => {
    render(<About />);
    const heading = screen.getByRole('heading',
      { name: /About Pokédex/i,
        level: 2,
      });

    expect(heading).toBeInTheDocument();
  });

  it('should contain two paragraphs with info about Pokédex', () => {
    render(<About />);
    const firstParagraph = screen.getByText(/This application simulates a Pokédex/);
    const secondParagraph = screen.getByText(/One can filter Pokémons by type/);

    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  it('should have an image of the Pokédex', () => {
    render(<About />);
    const pokedexImage = screen.getByRole('img');

    expect(pokedexImage).toBeInTheDocument();
    expect(pokedexImage).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
