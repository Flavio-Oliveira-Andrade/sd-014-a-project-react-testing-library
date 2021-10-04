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
});
