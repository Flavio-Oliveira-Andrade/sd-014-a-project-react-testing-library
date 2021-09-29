import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Testa a página About', () => {
  beforeEach(() => render(<About />));
  it('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    const h2 = screen.getByRole('heading', { name: /About Pokédex/i });
    expect(h2).toBeInTheDocument();
  });

  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const paragrafos = screen.getAllByText(/Pokémons/i);
    expect(paragrafos).toHaveLength(2);
    paragrafos.forEach((p) => expect(p).toBeInTheDocument());
  });

  it('Testa se a página contém uma imagem de uma Pokédex', () => {
    const pokedexImg = screen.getByRole('img');
    expect(pokedexImg).toBeInTheDocument();
    expect(pokedexImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(pokedexImg).toHaveAttribute('alt', 'Pokédex');
  });
});
