import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import About from '../components/About';

test('A página contém um heading h2 com o texto About Pokédex', () => {
  render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );

  const aboutText = screen.getByRole('heading', {
    level: 2,
    name: 'About Pokédex',
  });

  expect(aboutText).toBeInTheDocument();
});

test('A página contém dois parágrafos com texto sobre a Pokédex', () => {
  render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );

  const aboutParagraphText = screen.getByText('This application simulates a Pokédex, '
  + 'a digital encyclopedia containing all Pokémons');
  const aboutParagraphTextTwo = screen.getByText('One can filter Pokémons by type, '
  + 'and see more details for each one of them');

  expect(aboutParagraphText).toBeInTheDocument();
  expect(aboutParagraphTextTwo).toBeInTheDocument();
});

test('A página contém a imagem de uma Pokédex', () => {
  render(
    <MemoryRouter>
      <About />
    </MemoryRouter>,
  );

  const aboutImg = screen.getByRole('img');

  expect(aboutImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
