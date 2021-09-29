import { screen } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from './util/renderWithRouter';

describe('Teste do componente <About.js />', () => {
  it('Verifica se a página contém as informações sobre a Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const infoPokedex = screen.getByText(/This application simulates a Pokédex/i);
    expect(infoPokedex).toBeInTheDocument();
  });
  it('Verifica se a página contém um heading h2 com o texto About Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const aboutPokedexText = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });
    expect(aboutPokedexText).toBeInTheDocument();
  });
  it('Verifica se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const firstParagraph = screen.getByText(/This application simulates a Pokédex/i);
    const secondParagraph = screen.getByText(/One can filter Pokémons by type/i);
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });
  it('Verifica se a página contém a imagem de uma Pokédexx', () => {
    const pokedexImageUrl = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const { history } = renderWithRouter(<App />);
    history.push('/about');
    const pokedexImage = screen.getByAltText(/pokédex/i);
    expect(pokedexImage.src).toBe(pokedexImageUrl);
  });
});
