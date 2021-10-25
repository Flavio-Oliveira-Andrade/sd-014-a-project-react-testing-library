import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './utils/renderWithRouter';

describe('Teste o componente <About.js />.', () => {
  beforeEach(() => renderWithRouter(<About />));
  test('se a página contém um heading h2 com o texto About Pokédex', () => {
    const heading = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(heading).toBeInTheDocument();
  });

  test('se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const firstParagraphFrase = /This application simulates a Pokédex, a digital/i;
    const firstParagraph = screen.getByText(firstParagraphFrase);
    const secondParagraphFrase = /One can filter Pokémons by type, and see more details/i;
    const secondParagraph = screen.getByText(secondParagraphFrase);
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  test('se a página contém a seguinte imagem de uma Pokédex', () => {
    const imgLink = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imgTest = screen.getByRole('img');
    expect(imgTest).toHaveAttribute('src', imgLink);
  });
});
