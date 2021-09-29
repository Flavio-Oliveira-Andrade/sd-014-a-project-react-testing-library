import React from 'react';
import { screen, render } from '@testing-library/react';
import About from '../components/About';

describe('Testa o componente <About />', () => {
  it('se a página contém as informações sobre a Pokédex', () => {
    render(<About />);
    expect(screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    })).toBeInTheDocument();
  });

  it('se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />);
    const arr = [
      screen.getByText(/this application/i),
      screen.getByText(/one can filter/i),
    ];
    expect(arr).toHaveLength(2);
  });

  it('se a página contém a seguinte imagem de uma Pokédex', () => {
    const URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    render(<About />);
    expect(screen.getByRole('img', {
      name: /pokédex/i,
    })).toHaveAttribute('src', URL);
  });
});
