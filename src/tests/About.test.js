import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Verifica se a página contém as informações sobre a Pokédex.', () => {
  it('Verifica se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);
    const aboutTitle = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(aboutTitle).toBeInTheDocument();
  });

  it('Verifica se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const paragraphInfo = screen.getByText(/This application simulates a Pokédex/i);
    const paragraphInfo2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(paragraphInfo).toBeInTheDocument();
    expect(paragraphInfo2).toBeInTheDocument();
  });

  it('Verifica se a página contém a imagem específica de uma Pokédex', () => {
    renderWithRouter(<About />);
    const pokedexImg = screen.getByRole('img');
    expect(pokedexImg.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/'
    + 'Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
