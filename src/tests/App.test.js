// test('', () => {
// });
import React from 'react';
import { render } from '@testing-library/react'
import { About } from '../components';

describe('Testando componente About', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    render(<About/>);

    expect(getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémons'
      + 'One can filter Pokémons by type, and see more details for each one of them')).toBeInTheDocument();
  })
})

