import React from 'react';
import { render, screen } from '@testing-library/react';

import About from '../components/About';

describe('Testa o componente About', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', () => {
    render(<About />);
    const pokedexInfo = screen.getByText(/simulates a Pokédex/i);
    expect(pokedexInfo).toBeInTheDocument();
  });

  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    render(<About />);
    const aboutH2Text = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });
    expect(aboutH2Text).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    render(<About />);
    const paragraphs = screen.getAllByText(/pokémons/i);
    expect(paragraphs).toHaveLength(2);
  });

  it('Teste se a página contém a imagem correta de uma Pokédex:', () => {
    render(<About />);
    const pokedexImg = screen.getByRole('img');
    expect(pokedexImg).toBeInTheDocument();
    expect(pokedexImg).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
