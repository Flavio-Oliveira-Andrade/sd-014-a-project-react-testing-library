import React from 'react';
import { screen } from '@testing-library/react';

import renderWithRouter from './helper/renderWithRouter';
import About from '../components/About';

describe('About component test', () => {
  test('should the page have a heading with a text "About Pokédex"', () => {
    renderWithRouter(<About />);

    const heading = screen.getByRole('heading', {
      name: 'About Pokédex',
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });

  test('should the page have two paragraphs with a text about the pokédex', () => {
    renderWithRouter(<About />);

    const paragraphs = screen.getAllByText(/pokémons/i);
    expect(paragraphs).toHaveLength(2);
  });

  test('should render a specific image URL', () => {
    renderWithRouter(<About />);

    const URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    const image = screen.getByRole('img');
    expect(image.src).toBe(URL);
  });
});
