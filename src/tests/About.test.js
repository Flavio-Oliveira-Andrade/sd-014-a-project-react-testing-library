import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('About page', () => {
  it('should render an h2 heading with "About Pokedex" text', () => {
    render(<About />);
    const title = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(title).toBeInTheDocument();
  });

  it('should render information about Pokédex', () => {
    render(<About />);

    const firstParagraph = screen.getByText(/This application simulates a Pokédex/i);
    const secondParagraph = screen.getByText(/One can filter Pokémons by type/i);

    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  it('should render the information in two paragraphs', () => {
    render(<About />);
    // https://www.ocpsoft.org/tutorials/regular-expressions/or-in-regex/
    const paragraphs = screen.getAllByText(/this application simulates|one can filter/i);

    expect(paragraphs).toHaveLength(2);
  });

  it('should render an img with provided source', () => {
    render(<About />);
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', url);
  });
});
