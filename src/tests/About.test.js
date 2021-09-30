import React from 'react';
import { render, screen } from '@testing-library/react';
import { About } from '../components';

describe('Testa se as informações da página About estão corretas', () => {
  test('Testa se a página contém as informações sobre a Pokédex.', () => {
    render(<About />);

    const pokedexHeading = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(pokedexHeading).toBeInTheDocument();
  });

  test('', () => {
    render(<About />);
    const pokedexParagraph1 = screen.getByText('This application simulates a Pokédex, '
    + 'a digital encyclopedia containing all Pokémons');
    expect(pokedexParagraph1).toBeInTheDocument();
  });

  test('', () => {
    render(<About />);
    const pokedexParagraph2 = screen.getByText('One can filter Pokémons by type,'
    + ' and see more details for each one of them');
    expect(pokedexParagraph2).toBeInTheDocument();
  });

  test('', () => {
    // https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
    render(<About />);
    const pokedexImage = screen.getByRole('img');
    expect(pokedexImage).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
