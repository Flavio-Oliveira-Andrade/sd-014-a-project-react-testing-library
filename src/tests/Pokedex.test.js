import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { Pokedex } from '../components';

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<Pokedex />);
    const headingH2 = screen.getByRole('heading', { 
      level: 2,
      name: 'Encountered pokémons',
    });
  });
});
