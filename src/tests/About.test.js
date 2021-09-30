import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import About from '../components/About';

describe('Teste da página About', () => {
  test('Verifica se há a descrição sobre a pokédex', () => {
    render(<About />, { wrapper: BrowserRouter });

    let about = screen.getByText(
      /application simulates a pokédex, a digital encyclopedia containing all pokémons/i,
    );

    expect(about).toBeInTheDocument();

    about = screen.getByText(
      /one can filter pokémons by type, and see more details for each one of them/i,
    );

    expect(about).toBeInTheDocument();
  });
  test('Verifica se há o texto About Pokédex', () => {
    render(<About />, { wrapper: BrowserRouter });

    const title = screen.getByRole('heading', { name: /about pokédex/i });

    expect(title).toBeInTheDocument();
  });
  test('Verifica se a imagem está correta', () => {
    render(<About />, { wrapper: BrowserRouter });

    const img = screen.getByRole('img', { name: /pokédex/i });
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(img).toHaveAttribute('src', url);
  });
});
