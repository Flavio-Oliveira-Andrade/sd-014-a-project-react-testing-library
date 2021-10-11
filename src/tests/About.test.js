import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from './utils/renderWithRouter';

describe('Teste o componente <About /> - Requisito 2', () => {
  test('se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    expect(
      screen.getByRole('heading', { name: 'About Pokédex', level: 2 }),
    ).toBeInTheDocument();
  });

  test('Se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    expect(screen.getByText('This application simulates a Pokédex,'
    + ' a digital encyclopedia containing all Pokémons')).toBeInTheDocument();
    expect(screen.getByText('One can filter Pokémons by type,'
    + ' and see more details for each one of them')).toBeInTheDocument();
  });

  test('Se a página contém a seguinte imagem de uma Pokédex:'
  + ' https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/'
  + '800px-Gen_I_Pok%C3%A9dex.png', () => {
    renderWithRouter(<About />);
    expect(screen.getByRole('img'))
      .toHaveAttribute('src',
        'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
