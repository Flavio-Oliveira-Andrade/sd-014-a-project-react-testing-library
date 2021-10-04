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
});
