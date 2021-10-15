import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './renderWithRouter';

describe('Testando a página \'About\'', () => {
  beforeEach(() => renderWithRouter(<About />));
  test('Se o número de parágrafos é 2', () => {
    const numParagraphs = screen.getAllByText(/pokémons/i);
    expect(numParagraphs.length).toBe(2);
  });

  test('Se o texto \'About Pokédex\' foi renderizado na página', () => {
    const aboutHeading = screen.getByRole('heading', { name: 'About Pokédex' });
    expect(aboutHeading).toBeInTheDocument();
  });

  test('Se a imagem da Pokédex foi renderizada na página', () => {
    const imgSource = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imgTest = screen.getByRole('img');
    expect(imgTest).toHaveAttribute('src', imgSource);
  });

});
