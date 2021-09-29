import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helper/renderWithRouter';
import About from '../components/About';

test('if theres a text', () => {
  renderWithRouter(<About />);
  const appInfoTitle = screen.getByText(
    'This application simulates a Pokédex'
    + ', a digital encyclopedia containing all Pokémons',
  );
  const pokedexFilterTitle = screen.getByText(
    'One can filter Pokémons by type, and see more details for each one of them',
  );
  expect(appInfoTitle).toBeDefined();
  expect(pokedexFilterTitle).toBeDefined();
});

test('if theres a heading with "About Pokédex" text', () => {
  renderWithRouter(<About />);
  const aboutPokedex = screen.getByRole('heading', { level: 2, name: 'About Pokédex' });
  expect(aboutPokedex).toBeDefined();
});

test('there are 2 paragraphs with Pokémon includes in their text', () => {
  renderWithRouter(<About />);
  const aboutParagraphs = screen.getAllByRole('paragraph', { name: /Pokémons/i });
  expect(aboutParagraphs).toBeDefined();
  expect(aboutParagraphs.length).toBe(2);
});

test('there are image of pokedex', () => {
  renderWithRouter(<About />);
  const pokedexImage = screen.getByRole('img');
  expect(pokedexImage.src).toBe('https://cdn.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
