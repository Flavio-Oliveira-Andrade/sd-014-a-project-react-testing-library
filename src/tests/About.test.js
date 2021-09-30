import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../utilities/renderWithRouter';
import { About } from '../components';

describe('Testando o componente "About"', () => {
  it('testa se tem uma tag h2 com o texto "About Pokédex"', () => {
    renderWithRouter(<About />);
    const isH2 = screen.getByRole('heading', {
      name: /About Pokédex/i,
    });

    expect(isH2).toBeInTheDocument();
  });
  it('testa se tem dois paragrafos', () => {
    renderWithRouter(<About />);
    const paragraphOne = screen.getByText(/This application/i);
    const paragraphTwo = screen.getByText(/One can filter/i);

    expect(paragraphOne).toBeInTheDocument();
    expect(paragraphTwo).toBeInTheDocument();
  });
  it('testa se tem uma imagem', () => {
    renderWithRouter(<About />);
    const IMAGE_URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const { src } = screen.getByRole('img');

    expect(src).toBe(IMAGE_URL);
  });
});
