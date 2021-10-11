import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../components';

describe('Testa o component About', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    expect(screen.getByText(/This application simulates a Pokédex/i)).toBeInTheDocument();
  });

  test('Testa se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const textPokedex = screen.getByRole('heading', { level: 2, name: /about pokédex/i });
    expect(textPokedex).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const parag1 = screen.getByText(/This application simulates a Pokédex/i);
    const parag2 = screen.getByText(/One can filter Pokémons by type, and see more/i);
    expect(parag1).toBeInTheDocument();
    expect(parag2).toBeInTheDocument();
  });

  test('Teste se a página contém imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img', { name: /pokédex/i }).src;
    expect(image).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
