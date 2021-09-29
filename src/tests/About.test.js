import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../utils/renderWithRouter';

describe('Testes About.js', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);

    const pokedexInfo = screen.getByText(/encyclopedia containing all Pokémons/i);

    expect(pokedexInfo).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);

    const aboutText = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });

    expect(aboutText).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);

    const firstParagraph = screen.getByText(/This application simulates a Pokédex/i);
    const secondParagraph = screen.getByText(/One can filter Pokémons by type/i);

    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  test('Teste se a página contém uma imagem específica', () => {
    renderWithRouter(<About />);

    const IMAGE_URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    const pokedexImage = screen.getByAltText('Pokédex');

    expect(pokedexImage.src).toBe(IMAGE_URL);
  });
});
