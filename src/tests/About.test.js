import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../components';

describe('Verifica se o componente About contém'
+ ' informações sobre a Pokédex', () => {
  it('verifica se a página contém um "h2" com o texto "About Pokédex"', () => {
    render(<About />);
    const heading = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(heading).toBeInTheDocument();
  });

  it('verifica se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
    const firstParagraph = screen.getByText(/This application simulates a Pokédex/i);
    const secondParagrah = screen.getByText(/One can filter Pokémons by type/i);
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagrah).toBeInTheDocument();
  });

  it('verifica se a página contém a imagem de uma Pokédex"', () => {
    render(<About />);
    const pokedexSrc = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const pokedexImg = screen.getByRole('img', { name: 'Pokédex' });
    expect(pokedexImg).toHaveAttribute('src', pokedexSrc);
    expect(pokedexImg).toBeInTheDocument();
  });
});
