import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../support/renderWithRouter';
import App from '../App';

describe('Tests the APP component', () => {
  beforeEach(() => { renderWithRouter(<App />); });

  it('should have the text Home', () => {
    expect(screen.getByText(/Home/)).toBeInTheDocument();
  });

  it('should have the text About', () => {
    expect(screen.getByText(/About/)).toBeInTheDocument();
  });

  it('should have the text Favorite Pokémons', () => {
    expect(screen.getByText(/Favorite Pokémon/)).toBeInTheDocument();
  });
});

