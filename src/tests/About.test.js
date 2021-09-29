import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Teste se a página contém as informações sobre a Pokédex.', () => {
  beforeEach(() => render(<About />));

  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    const titulo = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(titulo).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const paragraph01 = screen.getByText(
      /this application simulates a pokédex/i,
    );
    const paragraph02 = screen.getByText(
      /one can filter pokémons/i,
    );
    expect(paragraph01).toBeInTheDocument();
    expect(paragraph02).toBeInTheDocument();
  });

  it('Teste se a página contém a imagem de uma Pokédex', () => {
    const imgUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const pokedexImg = screen.getByRole('img');
    expect(pokedexImg.src).toStrictEqual(imgUrl);
  });
});
