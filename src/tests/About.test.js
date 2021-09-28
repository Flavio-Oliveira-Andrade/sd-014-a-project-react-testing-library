import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import { About } from '../components';

const paragraphOne = /This application simulates a Pokédex/;
const paragraphTwo = /One can filter Pokémons by type/;
const URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

describe('Teste se a página contém as informações sobre a Pokédex', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);
    const headingH2 = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(headingH2).toBeInTheDocument();
  });
  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const firstParagraph = screen.getByText(paragraphOne);
    const secondParagraph = screen.getByText(paragraphTwo);
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });
  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const { src } = screen.getByRole('img');
    expect(src).toBe(URL);
  });
});
