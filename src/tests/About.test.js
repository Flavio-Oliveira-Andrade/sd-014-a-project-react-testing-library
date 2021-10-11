import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../services/renderWithRouter';
import About from '../components/About';

describe('Tests the About component', () => {
  it('renders info about the pokedex', () => {
    renderWithRouter(<About />);

    const aboutTitle = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(aboutTitle).toBeInTheDocument();

    const info1Text = /This application simulates a Pokédex,/i;

    const aboutInfo1 = screen.getByText(info1Text);
    expect(aboutInfo1).toBeInTheDocument();

    const info2Text = /One can filter Pokémons by type,/i;

    const aboutInfo2 = screen.getByText(info2Text);
    expect(aboutInfo2).toBeInTheDocument();
  });
});
