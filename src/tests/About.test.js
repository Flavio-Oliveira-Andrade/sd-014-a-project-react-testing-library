import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../services/RenderWithRouter';
import { About } from '../components';

describe('Testa o componente <About.js/>', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    expect(screen.getByText(/This application simulates a Pokédex/)).toBeInTheDocument();
  });
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const text = screen.getByRole('heading', { name: /about pokédex/i });
    expect(text).toBeInTheDocument();
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const um = screen.getByText(/one can filter pokémons by type, and see more details/i);
    const dois = screen.getByText(/one can filter pokémons by type, and see more/i);
    expect(um).toBeInTheDocument();
    expect(dois).toBeInTheDocument();
  });
  test('Teste se a página contém imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const imag = screen.getByRole('img', { name: /pokédex/i }).src;
    expect(imag).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
