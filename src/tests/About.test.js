/* eslint-disable max-len */
import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import RenderWithRouter from '../RenderWithRouter';

describe('Testes para o About.js', () => {
  test('Existe um Heading h2 com texto "About Pokédex"', () => {
    RenderWithRouter(<About />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(heading).toBeInTheDocument();
  });

  test('Existe 2 parágrafos falando sobre Pokemons', () => {
    const firstParagraph = 'This application simulates a Pokédex, a digital encyclopedia containing all Pokémons';
    const secondParagraph = 'One can filter Pokémons by type, and see more details for each one of them';
    RenderWithRouter(<About />);
    expect(screen.getByText(firstParagraph, secondParagraph)).toBeInTheDocument();
  });

  test('Testa se a página contém imagem de uma Podédex', () => {
    RenderWithRouter(<About />);
    const image = screen.getByAltText('Pokédex');
    expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(image).toBeInTheDocument();
  });
});
