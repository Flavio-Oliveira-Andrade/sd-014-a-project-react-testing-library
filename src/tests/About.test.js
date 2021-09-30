import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Testa o componente <About.js />', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    render(<About />);

    const aboutText = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(aboutText).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    render(<About />);

    const firstParagraph = screen.getByText(
      'This application simulates a Pokédex, '
      + 'a digital encyclopedia containing all Pokémons',
    );
    const secondParagraph = screen.getByText(
      'One can filter Pokémons by type, and see more details for each one of them',
    );

    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  it('Teste se a página contém uma imagem de uma Pokédex', () => {
    render(<About />);

    const URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const pokedexImg = screen.getByAltText('Pokédex');

    expect(pokedexImg).toBeInTheDocument();
    expect(pokedexImg.src).toContain(URL);
  });
});
