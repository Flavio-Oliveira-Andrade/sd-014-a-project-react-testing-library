// test('', () => {});
import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../services/renderWithRouter';

describe('2- Teste About.js', () => {
  beforeEach(() => { renderWithRouter(<About />); });

  test('Teste se a página contém as informações sobre a Pokédex. ', () => {
    expect(screen.getByText(/This application simulates/i)).toBeInTheDocument();
  });

  test('Teste se renderiza um h2 com o texto About Pokédex', () => {
    const h2 = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(h2).toBeInTheDocument();
  });

  test('Teste se renderiza 2 parágrafos sobre a Pokédex', () => {
    const paragraph1 = screen.getByText(/This application simulates a Pokédex/i);
    const paragraph2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  test('Teste se possui a imagem com a respectiva URL', () => {
    const image = screen.getByRole('img');
    expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
