import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './utilitary/renderWithRouter';
import About from '../components/About';

describe('Tests the About component', () => {
  beforeEach(() => { renderWithRouter(<About />); });

  it('should render Pokédex info', () => {
    expect(screen.getByText(/digital encyclopedia/i)).toBeInTheDocument();
  });

  it('should render the Pokédex <h2>', () => {
    const heading = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });

  it('should render <p> w/ Pokédex info', () => {
    const paragraph1 = screen.getByText(/This application simulates a Pokédex/i);
    const paragraph2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  it('should render the Pokédex <img>', () => {
    const image = screen.getByRole('img');
    expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
