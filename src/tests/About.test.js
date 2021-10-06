import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

describe('Testes relacionados ao About', () => {
  it('Informações sobre o pokedex são renderizadas', () => {
    renderWithRouter(<About />);

    const info01 = screen.getByText(/application simulates a Pokédex/i);
    const info02 = screen.getByText(/and see more details for each/i);

    expect(info01).toBeInTheDocument();
    expect(info02).toBeInTheDocument();
  });
});
