import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

const URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

describe('Testes do componente About', () => {
  it('Testando para ver se a página contém as informações sobre a Pokédex', () => {
    render(<About />);
    const paragraphOne = screen.getByText(/simulates a Pokédex/);
    const paragraphTwo = screen.getByText(/Pokémons by type/);
    expect(paragraphOne).toBeInTheDocument();
    expect(paragraphTwo).toBeInTheDocument();
  });

  it('Testando se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    const headingH2 = screen.getByRole('heading', {
      level: 2,
      name: /about/i,
    });
    expect(headingH2).toBeInTheDocument();
  });

  it('Testando se a página contém 2 parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
    const paragraph = screen.getAllByText(/Pokémons/);
    expect(paragraph).toHaveLength(2);
  });

  it('Testando se a página contém a seguinte imagem de uma Pokédex:', () => {
    render(<About />);
    const img = screen.getByRole('img');
    expect(img.src).toBe(URL);
  });
});
