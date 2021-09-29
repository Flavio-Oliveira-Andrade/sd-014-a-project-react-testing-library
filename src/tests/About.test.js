import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../utils/renderWithRouter';
import { About } from '../components';

const TEST_IMAGE = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

const TEXT_1 = 'This application simulates a Pokédex,'
+ ' a digital encyclopedia containing all Pokémons';

const TEXT_2 = 'One can filter Pokémons by type,'
 + ' and see more details for each one of them';

describe('Testa o componente <About.js />.', () => {
  test('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const heading2 = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(heading2).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const p1 = screen.getByText(TEXT_1);
    expect(p1).toBeInTheDocument();

    const p2 = screen.getByText(TEXT_2);
    expect(p2).toBeInTheDocument();
  });

  test('Testa se a página contém a imagem de uma Pokédex especificada', () => {
    renderWithRouter(<About />);
    const img = screen.getByRole('img');
    expect(img).toHaveAttribute('src', TEST_IMAGE);
  });
});
