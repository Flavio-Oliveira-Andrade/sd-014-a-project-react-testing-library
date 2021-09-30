import { render, screen } from '@testing-library/react';
import React from 'react';
import { About } from '../components';

describe('Teste o componente <About.js />', () => {
  it('Teste se a página contém um heading h2 com o texto About Pokédex', () => {
    render(
      <About />,
    );
    const aboutText = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(aboutText).toBeInTheDocument();
  });

  it('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
    render(
      <About />,
    );
    const firstParagraph = screen.getByText(/This application simulates a Pokédex/i);
    const secondParagraph = screen.getByText(/One can filter Pokémons by type/i);
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  it('Teste se a página contém a seguinte imagem de uma Pokédex', () => {
    render(
      <About />,
    );
    const imagePokedex = screen.getByRole('img');
    expect(imagePokedex).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png'); // Referencia : https://medium.com/reactbrasil/exemplo-de-teste-de-alto-n%C3%ADvel-com-react-testing-library-5c001e89d493
  });
});
