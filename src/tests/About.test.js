import React from 'react';
import { screen, render } from '@testing-library/react';

import { About } from '../components';

const imagem = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

describe('Testando componente About', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);

    const aboutText = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(aboutText).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
    const paragrafo01 = screen.getByText(/This application simulates a Pokédex/i);
    expect(paragrafo01).toBeInTheDocument();

    const paragrafo02 = screen.getByText(/One can filter Pokémons by type/i);
    expect(paragrafo02).toBeInTheDocument();
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    render(<About />);
    const imagemElemento = screen.getByAltText('Pokédex');

    expect(imagemElemento.src).toContain(imagem);
    // or
    // expect(imagemElemento).toHaveAttribute('src', imagem);
  });
});
