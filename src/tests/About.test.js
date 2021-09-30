import React from 'react';
import { render, screen } from '@testing-library/react';

import About from '../components/About';

describe(' Testes About.', () => {
  test(' Teste se a página contém as informações sobre a Pokédex.', () => {
    render(<About />);

    const paragraph = screen.getAllByText(/Pokémons/);
    expect(paragraph).toHaveLength(2);
  });

  test('a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);

    const tituloAbout = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(tituloAbout).toBeInTheDocument();
  });
  test(' Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);

    const paragrafo2About = screen.getByText(/One can filter/i);

    const paragrafo1About = screen.getByText(/This application simulates/i);

    expect(paragrafo1About).toBeInTheDocument();
    expect(paragrafo2About).toBeInTheDocument();
  });
  test('Teste se a página contém a seguinte imagem de uma Pokédex: https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png', () => {
    render(<About />);
    const IMG = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imagem = screen.getByRole('img');
    expect(imagem.src).toBe(IMG);
  });
});
