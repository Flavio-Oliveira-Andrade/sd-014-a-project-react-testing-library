import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import About from '../components/About';
//

const TEXT_1 = 'This application simulates a Pokédex, '
+ 'a digital encyclopedia containing all Pokémons';
const TEXT_2 = 'One can filter Pokémons by type, '
+ 'and see more details for each one of them';

const SRC_URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

describe('2. Teste o componente <About.js />:', () => {
  beforeEach(() => {
    renderWithRouter(<About />);
  });

  afterEach(() => {
    cleanup();
  });

  it('2.1. se a página contém as informações sobre a Pokédex',
    () => {
      const heading = screen.getByRole('heading');
      expect(heading).toBeInTheDocument();
    });

  it('2.2. se a página contém um heading h2 com o texto About Pokédex',
    () => {
      const heading = screen.getByRole('heading',
        { level: 2, name: /about pokédex/i });
      expect(heading).toBeInTheDocument();
    });

  it('2.3. se a página contém dois parágrafos com texto sobre a Pokédex',
    () => {
      const regexText1 = new RegExp(TEXT_1, 'i');
      const regexText2 = new RegExp(TEXT_2, 'i');
      const firstContent = screen.getByText(regexText1);
      const secondContent = screen.getByText(regexText2);
      expect(firstContent).toBeInTheDocument();
      expect(secondContent).toBeInTheDocument();
    });

  it('2.5. se a página contém a seguinte imagem de uma Pokédex com a URL',
    () => {
      const img = screen.getByRole('img');
      expect(img).toBeInTheDocument();
      expect(img.src).toBe(SRC_URL);
    });
});
