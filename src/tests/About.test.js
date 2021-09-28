import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import renderWithRouter from '../renderWithRouter';

describe('Testes do componente About', () => {
  test('Teste se a página contém as informações sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const aboutH2Text = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(aboutH2Text).toBeInTheDocument();
    const infoText1 = screen.getByText(/This application simulates a Pokédex/i);
    const infoText2 = screen.getByText(/One can filter Pokémons by type/i);
    expect(infoText1).toBeInTheDocument();
    expect(infoText2).toBeInTheDocument();
    const image = screen.getByRole('img');
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
