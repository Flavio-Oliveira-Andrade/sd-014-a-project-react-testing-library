import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import { About } from '../components';

describe('About.js test', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    render(<MemoryRouter><About /></MemoryRouter>);

    const aboutText = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(aboutText).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    render(<MemoryRouter><About /></MemoryRouter>);
    const texto1 = screen.getByText(/One can filter Pokémons by type/i);
    expect(texto1).toBeInTheDocument();
    const texto2 = screen.getByText(/This application simulates a Pokédex/i);
    expect(texto2).toBeInTheDocument();
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    render(<MemoryRouter><About /></MemoryRouter>);
    const img = screen.getByRole('img');
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
