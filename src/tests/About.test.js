import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import About from '../components/About';

test('Teste o componente <About.js />', () => {
  renderWithRouter(<About />);

  const text1 = (
    'One can filter Pokémons by type, and see more details for each one of them'
  );
  const text2 = (
    'This application simulates a Pokédex, a digital encyclopedia containing all Pokémons'
  );

  const imgLink = (
    'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png'
  );

  expect(
    screen.getByText(text1),
  ).toBeInTheDocument();

  expect(
    screen.getByText(text2),
  ).toBeInTheDocument();

  expect(
    screen.getByRole('heading', { level: 2 }).textContent,
  ).toBe('About Pokédex');

  expect(
    screen.getByRole('img').src,
  ).toBe(imgLink);
});
