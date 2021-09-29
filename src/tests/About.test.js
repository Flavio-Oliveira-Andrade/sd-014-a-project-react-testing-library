import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Testa o componente About', () => {
  // it('verifica se a página contém as informações sobre a pokedex', () =>  {

  // });

  it('verifica se a página contém um h2 com o texto "About Pokedex"', () => {
    render(<About />);
    const heading = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(heading).toBeInTheDocument();
  });

  it('testa se a paǵina contém dois parágrafos com texto sobre a Pokedex', () => {
    render(<About />);
    const paragraph1 = screen.getByText(/This application simulates a Pokédex/);
    const paragraph2 = screen.getByText(/One can filter Pokémons by type/);

    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  it('verifica se a pagina contém a imagem da pokedex', () => {
    render(<About />);
    const image = screen.getByRole('img', {
      name: 'Pokédex',
    });

    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
