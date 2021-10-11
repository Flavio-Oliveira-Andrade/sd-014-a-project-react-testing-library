import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../components';

describe('Testando componente About', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    render(<About />);

    expect(screen.getByText(
      (/This application simulates a Pokédex/i),
    )).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    render(<About />);

    const textH2 = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });

    expect(textH2).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    render(<About />);

    expect(screen.getByText(
      (/This application simulates a Pokédex/i),
    )).toBeInTheDocument();
    expect(screen.getByText(
      (/One can filter Pokémons by type/i),
    ))
      .toBeInTheDocument();
  });

  test('Teste se contém uma imagem no arquivo', () => {
    render(<About />);

    const image = screen.getByRole('img');
    expect(image.src).toContain('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
