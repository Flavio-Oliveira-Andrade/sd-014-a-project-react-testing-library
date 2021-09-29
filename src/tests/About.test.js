import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../services/renderWithRouter';
import { About } from '../components';

describe('Testa o componente About.js', () => {
  it('Deveria conter informações sobre pokédex na página', () => {
    renderWithRouter(<About />);
    expect(screen.getByText(/a digital encyclopedia containing all Pokémons/i))
      .toBeInTheDocument();
  });
  it('Deveria conter um elemento h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const h2 = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(h2).toBeInTheDocument();
  });
  it('Deveria conter dois parágrafos com texto sobre a pokédex', () => {
    renderWithRouter(<About />);
    const firstParagraph = /This application simulates a Pokédex/i;
    const secondParagraph = /One can filter Pokémons by type/i;
    expect(screen.getByText(firstParagraph)).toBeInTheDocument();
    expect(screen.getByText(secondParagraph)).toBeInTheDocument();
  });
  it('Deveria conter uma imagem específica de uma pokédex', () => {
    renderWithRouter(<About />);
    const img = screen.getByAltText('Pokédex');
    const imgSource = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(img.src).toBe(imgSource);
  });
});
