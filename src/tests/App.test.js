import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './utilitary/renderWithRouter';
import App from '../App';

describe('Tests component App redirects', () => {
  beforeEach(() => { renderWithRouter(<App />); });

  it('should render Home text', () => {
    expect(screen.getByText(/Home/)).toBeInTheDocument();
  });

  it('should render About text', () => {
    expect(screen.getByText(/About/)).toBeInTheDocument();
  });

  it('should render Favorite Pokémon text', () => {
    expect(screen.getByText(/Favorite Pokémon/)).toBeInTheDocument();
  });
});
