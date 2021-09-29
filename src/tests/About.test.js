import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import historyFunction from '../utils/historyFunction';
import App from '../App';

describe('Teste o componente About.js.', () => {
  test('Teste se a página contém um heading ', () => {
    const { history } = historyFunction(<App />);
    history.push('/about');
    const textTitle = screen.getByRole('heading', { level: 2 });
    expect(textTitle).toBeInTheDocument();
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    const { history } = historyFunction(<App />);
    history.push('/about');
    const paragraph1 = screen.getByText('This application simulates a Pokédex,'
    + ' a digital encyclopedia containing all Pokémons');

    const paragraph2 = screen.getByText('One can filter Pokémons by type,'
    + ' and see more details for each one of them');

    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });
  test('Teste se a página contém a imagem de uma Pokédex', () => {
    const { history } = historyFunction(<App />);
    history.push('/about');
    const imgAbout = screen.getByAltText('Pokédex');
    expect(imgAbout).toHaveProperty('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
