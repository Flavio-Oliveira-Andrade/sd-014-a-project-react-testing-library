import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

it('should contain informations about pokedex', () => {
  render(
    <About />,
  );
  const headingPokedex = screen.getByRole('heading', {
    level: 2,
    name: 'About Pokédex',
  });
  expect(headingPokedex).toBeInTheDocument();
  const paragraphPokedexOne = screen.getByText('This application simulates a Pokédex, '
  + 'a digital encyclopedia containing all Pokémons');
  expect(paragraphPokedexOne).toBeInTheDocument();
  const paragraphPokedexTwo = screen.getByText('One can filter Pokémons by type, '
  + 'and see more details for each one of them');
  expect(paragraphPokedexTwo).toBeInTheDocument();
  const imagePokedex = screen.getByRole('img');
  expect(imagePokedex).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
