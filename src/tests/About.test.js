import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../utils/RenderWithRoute';

import { About } from '../components';

const pokedexPath = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

describe('About.js test', () => {
  test('Test se a página contém um heading h2 com o texto "About Pokédex" ', () => {
    renderWithRouter(<About />);
    const aboutHeading = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(aboutHeading).toBeInTheDocument();
  });

  test('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const paragrafos = screen.getAllByText(/poké/i, { selector: 'p' });
    expect(paragrafos.length).toBe(2);
  });

  test('Testa se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const pokedexImg = screen.getByRole('img', { name: /pokédex/i });

    expect(pokedexImg.src).toBe(pokedexPath);
    expect(pokedexImg).toBeInTheDocument();
  });
});
