import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import About from '../components/About';

describe('Testando About.js', () => {
  test('verifica se existe o título "About Pokédex"', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const title = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(title).toBeInTheDocument();
  });
  test('verifica há dois paragrafos na página', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const firstParagraph = screen.getByText(/this application/i);
    const secondParagraph = screen.getByText(/one can filter/i);
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });
  test('verifica se há uma imagem na página', () => {
    render(
      <MemoryRouter>
        <About />
      </MemoryRouter>,
    );
    const image = screen.getByRole('img');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
