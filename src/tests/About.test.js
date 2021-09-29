import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Requirement - 2 : About page', () => {
  it('should have h2 tag with "About Pokédex"', () => {
    render(<About />);
    const h2Tag = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(h2Tag).toBeInTheDocument();
  });
  it('should have 2 paragraphs about pokedex', () => {
    render(<About />);
    const firstParagraph = screen.getByText(/This application simulates/i);
    const secondParagraph = screen.getByText(/One can filter Pokémons by type/i);
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });
  it('should have img tag with specific src', () => {
    render(<About />);
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img.src).toBe(url);
  });
});
