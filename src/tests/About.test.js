import React from 'react';
import { screen, render } from '@testing-library/react';
import { About } from '../components';

describe('Teste o componente About', () => {
  beforeEach(() => render(<About />));
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    const text = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(text).toBeInTheDocument();
  });
  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    const text1 = /This application simulates a Pokédex/i;
    const text2 = /One can filter Pokémons by type/;
    const para1 = screen.getByText(text1);
    const para2 = screen.getByText(text2);
    expect(para1).toBeInTheDocument();
    expect(para2).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const img = screen.getByRole('img', { name: 'Pokédex' }).src;
    expect(img).toBe(
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png',
    );
  });
});
