import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../components';

describe('Testando componente About', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    render(<About />);

    expect(screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémons'))
      .toBeInTheDocument();
    expect(screen.getByText('One can filter Pokémons by type, and see more details for each one of them'))
      .toBeInTheDocument();
  });

  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
    render(<About />);
  });
});
