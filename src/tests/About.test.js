import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Teste o componente <About.js />', () => {
  beforeEach(() => renderWithRouter(<About />));

  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    const h2 = screen.getByRole('heading', {
      name: /about Pokédex/i,
      level: 2,
    });
    expect(h2).toBeInTheDocument();
  });
  test('Existem dois parágrafos com texto sobre a Pokédex na página"', () => {
    const paragraph = screen.getAllByText(/Pokémon/);
    expect(paragraph).toHaveLength(2);
    paragraph.forEach((p) => expect(p).toBeInTheDocument());
  });
  test('Existe a imagem de uma Pokédex na página', () => {
    const pokemonImg = screen.getByAltText('Pokédex');
    expect(pokemonImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
