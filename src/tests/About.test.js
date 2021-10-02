import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../components';

describe('Testa o requisito 2', () => {
  it('Testa se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);
    const heading = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(heading).toBeInTheDocument();
  });

  it('Testa se a página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img', { name: 'Pokédex' });
    expect(image).toBeInTheDocument();
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });

  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const paragraph1 = 'This application simulates a Pokédex,'
    + ' a digital encyclopedia containing all Pokémons';
    const paragraph2 = 'One can filter Pokémons by type,'
    + ' and see more details for each one of them';
    const paragraphs = screen.getByText(paragraph1, paragraph2);
    expect(paragraphs).toBeInTheDocument();
  });
});
