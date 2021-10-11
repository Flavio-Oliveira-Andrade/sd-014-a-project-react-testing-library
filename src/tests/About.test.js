import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe(' Teste o componente <About.js /> ', () => {
  test('Teste se a página contém as informações sobre a Pokédex.', () => {
    render(<About />);
    const pokedex = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });
    const img = screen.getByAltText(/Pokédex/i);

    expect(pokedex).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
