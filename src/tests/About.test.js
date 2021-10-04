import React from 'react';
import { screen } from '@testing-library/react';
import About from '../components/About';
import RenderWithRouter from '../util/RenderWithRouter';

describe('testando About', () => {
  test('componentes de heading', () => {
    RenderWithRouter(<About />);
    const Titulo = screen.getByRole('heading', {
      level: 2,
      name: /about pokédex/i,
    });

    expect(Titulo).toBeInTheDocument();
  });
  test('verificando se existe duas tag <p>', () => {
    RenderWithRouter(<About />);
    const tagP1 = screen.getByText(
      /This application simulates a Pokédex, a digital encyclopedia containing/i,
    );
    const tagP2 = screen.getByText(
      /This application simulates a Pokédex, a digital encyclopedia containing/i,
    );

    expect(tagP1).toBeInTheDocument();
    expect(tagP2).toBeInTheDocument();
  });
  test('testando se existe a imagem do Pokedex', () => {
    RenderWithRouter(<About />);
    const srcLink = screen.getByRole('img');
    const expectLink = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';

    expect(srcLink).toBeInTheDocument();
    expect(srcLink.src).toBe(expectLink);
  });
});
