import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../components';

it('contains a h2 with "About Pokédex" text', () => {
  render(<About />);

  const text = screen.getByRole('heading', { name: /About Pokédex/i }, { level: 1 });
  expect(text).toBeDefined();
});

it('contains 2 paragraphs with Pokédex texts', () => {
  render(<About />);

  const paragraphs = screen.getAllByText(/Pokémons/i);
  expect(paragraphs[0]).toBeInTheDocument();
  expect(paragraphs[1]).toBeInTheDocument();
});

it('contains a specific image ', () => {
  render(<About />);

  const url = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  const image = screen.getByRole('img');
  expect(image).toHaveAttribute('src', url);
});
