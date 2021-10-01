import React from 'react';
import { screen } from '@testing-library/react';
import { NotFound } from '../components';
import renderWithRouter from './utils/renderWithRouter';

describe('tests NotFound.js component', () => {
  it('renders a "Page requested not found" text', () => {
    renderWithRouter(<NotFound />);

    const notFoundText = screen.getByRole('heading', {
      level: 2,
      name: /Page requested not found/,
    });
    expect(notFoundText).toBeInTheDocument();

    const pkmImage = screen
      .getByAltText('Pikachu crying because the page requested was not found');
    expect(pkmImage).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
