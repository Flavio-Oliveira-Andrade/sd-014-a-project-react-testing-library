import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './auxiliary-tools/renderWithRouter';

describe('About component should display info about the Pokédex', () => {
  it('Contains one \'h2\' element with the text \'About Pokédex\'', () => {
    renderWithRouter(<About />);
    const aboutHeading = screen.getByRole('heading', { name: 'About Pokédex', level: 2 });

    expect(aboutHeading).toBeInTheDocument();
  });

  it('Contains two paragraphs describing the Pokédex', () => {
    renderWithRouter(<About />);
    const twoParagraphs = screen.getAllByText(/Pokémons/i);
    expect(twoParagraphs).toHaveLength(2);
  });

  it('Contains a specific img of a Pokédex', () => {
    renderWithRouter(<About />);
    const pokeDexPic = screen.getByRole('img');

    expect(pokeDexPic).toBeInTheDocument();
    expect(pokeDexPic.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
