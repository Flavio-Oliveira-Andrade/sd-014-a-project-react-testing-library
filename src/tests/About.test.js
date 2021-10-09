import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../components';

describe('Requisto 02', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<About />);
    const title = screen.getByRole('heading', { level: 2 });
    expect(title.innerHTML).toBe('About Pokédex');
  });
  it('deve conter dois paragrafos com o texto sobre a pokédex', () => {
    renderWithRouter(<About />);
    const paragraph = screen.getAllByText(/pokémons/i);
    expect(paragraph).toHaveLength(2);
  });
  it('Deve conter a imagem com a URL', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img');
    const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(image.src).toBe(url);
  });
});
