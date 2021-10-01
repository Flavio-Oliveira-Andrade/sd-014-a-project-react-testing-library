import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import Pokedex from '../components/Pokedex';

describe('Testa o componente <Pokedex />', () => {
  test('Testa se a página contém um heading h2 com o texto "Encountered pokémons"',
    () => {
      renderWithRouter(<Pokedex />);

      const h2Text = screen.getByRole('heading', {
        level: 2,
        name: 'Encountered pokémons',
      });

      expect(h2Text).toBeInTheDocument();
    });
});

test('', () => {});
