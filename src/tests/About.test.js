import React from 'react';
import { Router } from 'react-router';
import { createMemoryHistory } from 'history';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

const renderWithRouter = (component) => {
  const customHistory = createMemoryHistory();
  const utils = render(
    <Router history={ customHistory }>
      { component }
    </Router>,
  );

  return {
    ...utils,
    history: customHistory,
  };
};

describe('tests About.js component', () => {
  it('renders Pokédex info', () => {
    renderWithRouter(<About />);

    const pokedexInfo = screen.getByText(/this application simulates a Pokédex/i);
    expect(pokedexInfo).toBeInTheDocument();
  });

  it('renders a heading level 2 containing "About Pokédex" text', () => {
    renderWithRouter(<About />);

    const headingText = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });
    expect(headingText).toBeInTheDocument();
  });

  it('renders two paragraphs containing texts about the Pokédex', () => {
    renderWithRouter(<About />);

    const firstParagraph = screen
      .getByText(/a digital encyclopedia containing all Pokémons/i);
    expect(firstParagraph).toBeInTheDocument();

    const secondParagraph = screen
      .getByText(/one can filter Pokémons by type/i);
    expect(secondParagraph).toBeInTheDocument();
  });

  it('renders a Pokémon image', () => {
    renderWithRouter(<About />);

    const pkmImage = screen.getByRole('img');
    expect(pkmImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(pkmImage).toHaveAttribute('alt', 'Pokédex');
    // ref https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
  });
});
