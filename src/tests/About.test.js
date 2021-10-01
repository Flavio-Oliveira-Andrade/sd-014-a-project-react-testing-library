import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Testa o componente About', () => {
  test('A página contém um h2 com o texto About Pokédex', () => {
    render(<About />);
    const heading2 = screen.getByRole('heading');
    expect(heading2).toBeInTheDocument();
    const heading2text = screen.getByText(/About Pokédex/i);
    expect(heading2text).toBeInTheDocument();
  });

  test('A página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
    const paragraph1 = screen.getByText(/This application simulates a Pokédex/i);
    expect(paragraph1).toBeInTheDocument();
    const paragraph2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(paragraph2).toBeInTheDocument();
  });

  test('A página contém uma imagem de Pokédex', () => {
    render(<About />);
    const pokedexImage = screen.getByAltText(/Pokédex/i);
    expect(pokedexImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
