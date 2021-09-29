import React from 'react';
import { screen } from '@testing-library/react';

import renderWithRouter from './utils/renderWithRouter';
import About from '../components/About';

describe('Teste o componente <About.js />', () => {
  test('Teste se a página contém um heading h2 com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);

    const headingText = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });
    expect(headingText).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);

    const paragraphs = screen.getAllByText(/Pokémons/);
    expect(paragraphs).toHaveLength(2);
    paragraphs.map((paragraph) => expect(paragraph).toBeInTheDocument());
  });

  test('Teste se a página contém uma imagem específica de uma Pokédex', () => {
    renderWithRouter(<About />);
    const IMG_SRC = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const pokedexImg = screen.getByAltText(/Pokédex/);
    expect(pokedexImg).toHaveAttribute('src', IMG_SRC);
    expect(pokedexImg).toBeInTheDocument();
  });
});
