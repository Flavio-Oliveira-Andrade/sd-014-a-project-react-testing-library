import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Pokemon.js', () => {
  it('Teste se é rndrzd um card com as informações de determinado pokémon', () => {
    renderWithRouter(<App />);
    expect((screen.getByTestId('pokemon-name').innerHTML)).toBe('Pikachu');
  });
});
