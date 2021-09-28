import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

test('Teste o componente <About.js />', () => {
  const { history } = renderWithRouter(<About />);

  const text1 = 'One can filter Pokémons by type, and see more details for each one of them';
  const text2 = 'This application simulates a Pokédex, a digital encyclopedia containing all Pokémons';

});
