import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('Testes do componente About', () => {
  test('Testando para ver se a página contém as informações sobre a Pokédex', () => {
    render(<About />);
  });

  test('Testando se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);
    const headingH2 = screen.getByRole('heading', {
      level: 2,
      name: /about/i,
    });
    expect(headingH2).toBeInTheDocument();
  });

  test('Testando se a página contém parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
    const paragraphOne = screen.getByText(/simulates a Pokédex/);
    const paragraphTwo = screen.getByText(/Pokémons by type/);
    expect(paragraphOne).toBeInTheDocument();
    expect(paragraphTwo).toBeInTheDocument();
  });

  test('Testando se a página contém a seguinte imagem de uma Pokédex:', () => {
    render(<About />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
