import React from 'react';
import { screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './renderWithRouter';

describe('Realizando teste no componente About', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/About');
    const aboutH2 = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(aboutH2).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/About');
    const paragraphUm = screen.getByText(/This application simulates a Pokédex/i);
    expect(paragraphUm).toBeInTheDocument();

    const paragraphDois = screen.getByText(/One can filter Pokémons by type/i);
    expect(paragraphDois).toBeInTheDocument();
  });

  test('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/About');

    const URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imgPokedex = screen.getByRole('img', {
      name: /Pokédex/i,
    });
    expect(imgPokedex).toHaveAttribute('src', URL);
  });
});
