import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Test About component', () => {
  it('should contain a heading with the text About Pokédex', () => {
    renderWithRouter(<About />);
    const heading = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(heading).toBeInTheDocument();
  });

  it('should contain two paragraphs', () => {
    renderWithRouter(<About />);
    const firstParagraph = screen.getByText(
      /This application simulates a Pokédex/,
    );
    const secondParagraph = screen.getByText(/One can filter Pokémons by type/);
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  it('should contain an image of a Pokédex', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      'src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
