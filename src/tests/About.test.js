import React from 'react';
import { render, screen } from '@testing-library/react';

import About from '../components/About';

describe('2. Teste o componente <About.js />', () => {
  beforeEach(() => render(<About />));

  test('A página contém um heading h2 com o texto About Pokédex', () => {
    const heading2 = screen.getByRole('heading', { name: /About Pokédex/i, level: 2 });
    expect(heading2).toBeInTheDocument();
  });

  test('A página contém dois parágrafos com texto sobre a Pokédex', () => {
    const p = screen.getAllByText(/Pokémons/);
    expect(p).toHaveLength(2);
    p.forEach((paragraph) => expect(paragraph).toBeInTheDocument());
  });

  test('A página contém a imagem de uma Pokédex', () => {
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(image).toHaveAttribute('alt', 'Pokédex');
  });
});
