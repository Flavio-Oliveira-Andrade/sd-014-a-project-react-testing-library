import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { About } from '../components';

describe('teste oo componente About', () => {
  test('se a página contém as informações sobre a Pokédex', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    const aboutPokedex = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(aboutPokedex).toBeInTheDocument();
  });

  test('se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const paragraph1 = screen.getByText(/This application simulates a Pokédex/);
    const paragraph2 = screen.getByText(/One can filter Pokémons by type/);
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });

  test('se a página contém a imagem de uma Pokédex', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );

    const imgPokedex = screen.getByRole('img');
    expect(imgPokedex).toBeInTheDocument();
    expect(imgPokedex).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
