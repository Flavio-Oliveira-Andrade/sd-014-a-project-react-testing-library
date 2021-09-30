import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './services/renderWithRouter';

describe('tests About.js component', () => {
  beforeEach(() => { renderWithRouter(<About />); });
  it('renders Pokédex info', () => {
    const pokedexInfo = screen.getByText(/this application simulates a Pokédex/i);
    expect(pokedexInfo).toBeInTheDocument();
  });

  it('renders a heading level 2 containing "About Pokédex" text', () => {
    const headingText = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });
    expect(headingText).toBeInTheDocument();
  });

  it('renders two paragraphs containing texts about the Pokédex', () => {
    const firstParagraph = screen
      .getByText(/a digital encyclopedia containing all Pokémons/i);
    expect(firstParagraph).toBeInTheDocument();

    const secondParagraph = screen
      .getByText(/one can filter Pokémons by type/i);
    expect(secondParagraph).toBeInTheDocument();
  });

  it('renders a Pokémon image', () => {
    const pkmImage = screen.getByRole('img');
    expect(pkmImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(pkmImage).toHaveAttribute('alt', 'Pokédex');
    // ref https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
  });
});
