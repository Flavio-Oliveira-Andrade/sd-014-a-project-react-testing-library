import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../render/renderWithRouter';
import About from '../components/About';

describe('Testa se aplicação é renderizada para o componente About', () => {
  test('Se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const textAboutPokedexH2 = screen.getByRole('heading',
      {
        name: 'About Pokédex',
        level: 2,
      });
    expect(textAboutPokedexH2).toBeInTheDocument();
  });

  test('Se a página contém dois parágrafos com texto sobre a pokédex', () => {
    renderWithRouter(<About />);
    const textPokemonsParagraph = screen.getAllByText(/Pokémons/i);
    expect(textPokemonsParagraph.length).toBe(2);
  });

  test('Se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const imagemPokedex = screen.getByRole('img');
    expect(imagemPokedex.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
