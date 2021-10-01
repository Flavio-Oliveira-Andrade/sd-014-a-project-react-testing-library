import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Requisito 2', () => {
  test('A página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);
    const heading = screen.getByRole('heading', {
      name: 'About Pokédex',
    });
    expect(heading).toBeInTheDocument();
  });
  test('a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const text1 = /This application simulates a Pokédex/i;
    const text2 = /One can filter Pokémons by type, and see/i;
    const p1 = screen.getByText(text1);
    const p2 = screen.getByText(text2);
    expect(p1).toBeInTheDocument();
    expect(p2).toBeInTheDocument();
  });
  //  https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
  test('a página contém a seguinte imagem de uma Pokédex.', () => {
    renderWithRouter(<About />);
    const srcImg = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imagePokedex = screen.getByRole('img');
    expect(imagePokedex).toBeInTheDocument();
    expect(imagePokedex.src).toBe(srcImg);
  });
});
