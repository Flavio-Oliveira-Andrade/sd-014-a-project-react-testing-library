import { render, screen } from '@testing-library/react';
import React from 'react';
// import userEvent from '@testing-library/user-event';

import About from '../components/About';

describe('Test component "About"', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    render(<About />);

    const aboutInfo = screen.getByText(/This application simulates a Pokédex/i);
    expect(aboutInfo).toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />);

    const aboutTitlePage = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });

    expect(aboutTitlePage).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    render(<About />);

    const numParagrafós = screen.getAllByText(/pokémons/i);
    expect(numParagrafós).toHaveLength(2);
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex:', () => {
    render(<About />);

    const img = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const aboutImage = screen.getByRole('img');
    expect(aboutImage.src).toStrictEqual(img);
  });
});
