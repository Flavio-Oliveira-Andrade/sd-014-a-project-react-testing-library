import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Test About component', () => {
  it('contains a heading with the text "About Pokédex"', () => {
    render(<About />);
    const heading = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(heading).toBeInTheDocument();
  });

  it('contains two paragraphs', () => {
    render(<About />);
    const firstParagraph = screen.getByText(
      /This application simulates a Pokédex/,
    );
    const secondParagraph = screen.getByText(/One can filter Pokémons by type/);
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  it('contains an image of a Pokédex', () => {
    render(<About />);
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
