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
    expect(screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    })).toBeInTheDocument();
  });

  it('should render <p> w/ Pokédex info', () => {
    expect(screen.getByText(/This application simulates a Pokédex/i)).toBeInTheDocument();
    expect(screen.getByText(/One can filter Pokémons by type/i)).toBeInTheDocument();
  });

  it('should render the Pokédex <img>', () => {
    expect(screen.getByRole('img').src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
