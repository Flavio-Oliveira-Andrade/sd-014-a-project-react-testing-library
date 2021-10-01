import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('testa o componente about', () => {
  it('verifica se é renderizado um heading h2 com texto "About Pokédex"', () => {
    render(<About />);

    const aboutPokedex = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(aboutPokedex).toBeInTheDocument();
  });

  it('verifica se é renderizado informações sobre a Pokédex', () => {
    render(<About />);

    const p1 = screen.getByText(/This application simulates a Pokédex/i);
    const p2 = screen.getByText(/One can filter Pokémons by type/i);

    expect(p1 && p2).toBeInTheDocument();
  });

  it('verifica se a pagina contém a imagem da pokedex', () => {
    render(<About />);

    const image = screen.getByRole('img');

    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
