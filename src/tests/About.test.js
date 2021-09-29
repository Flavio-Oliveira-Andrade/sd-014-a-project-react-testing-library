import React from 'react';
import { screen } from '@testing-library/react';

import renderWithRouter from '../utils/renderWithRouter';
import About from '../components/About';
// digital encyclopedia
// and see more details

describe('Testando o componente About.', () => {
  it('a página contém as informações sobre a Pokédex.', () => {
    renderWithRouter(<About />);
    const pElements = screen.getAllByText(/pokémons/i);
    expect(pElements).toHaveLength(2);
  });
  it('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    renderWithRouter(<About />);
    const heading = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
    expect(heading).toBeInTheDocument();
  });
  it('', () => {
    renderWithRouter(<About />);
    const img = screen.getByRole('img');
    const src = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    expect(img.src).toBe(src);
  });
});
