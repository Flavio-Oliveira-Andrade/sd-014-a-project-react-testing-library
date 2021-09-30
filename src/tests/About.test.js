import React from 'react';
import { screen } from '@testing-library/react';
import { About } from '../components';
import renderWithRouter from '../renderWithRouter';

const imagem = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

describe('testa se a página contém as informações sobre a Pokédex', () => {
  test(' testa  se  existe um titulo  com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const titulo = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    expect(titulo).toBeInTheDocument();
  });

  test('testa se a  página contém dois paragrafos sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const paragrafo1 = screen.getByText(/This application simulates a Pokédex,/i);
    expect(paragrafo1).toBeInTheDocument();

    const paragrafo2 = screen.getByText(/One can filter Pokémons by type, and see /i);
    expect(paragrafo2).toBeInTheDocument();
  });

  test('testa se a página contém a imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const imagemPok = screen.getByRole('img');
    expect(imagemPok.src).toBe(imagem);
  });
});
