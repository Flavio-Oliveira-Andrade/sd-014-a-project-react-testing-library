import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';
import p from '../dataP';

test('verify informations of Pokedex to be in the document', () => {
  render(<About />);

  expect(<About />).not.toBeNull();
});

test('verify h2 to have correct text', () => {
  render(<About />);
  const heading = screen.getByRole('heading');

  expect(heading).toHaveTextContent('About Pokédex');
});

test('verify paragraphs to have correct text', () => {
  render(<About />);
  // const p = 'This application simulates a Pokédex, a digital encyclopedia containing all Pokémons';
  const primeiroP = screen.getByText(p);
  const p2 = 'One can filter Pokémons by type, and see more details for each one of them';
  const segundoP = screen.getByText(p2);

  expect(primeiroP).toBeInTheDocument();
  expect(segundoP).toBeInTheDocument();
});

test('verify correct image path', () => {
  render(<About />);
  const image = screen.getByRole('img');

  expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  expect(image).toHaveAttribute('alt', 'Pokédex');
});
