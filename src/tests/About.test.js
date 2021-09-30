import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../utils/renderWithRouter';

import About from '../components/About';

describe('Página About', () => {
  test('renderiza informações sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const heading = screen.getByRole('heading',
      { level: 2, name: 'About Pokédex' });
    expect(heading).toBeInTheDocument();

    const paragraphs = screen.getAllByText(/poké/i)
      .filter((element) => element !== heading);
    expect(paragraphs).toHaveLength(2);

    const image = screen.getByRole('img');
    const expectedImageURL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(image).toBeInTheDocument();
    expect(image.src).toBe(expectedImageURL);
  });
});
