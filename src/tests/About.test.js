import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import { About } from '../components';

describe('About.js test', () => {
//   it(' Testa se a página contém as informações sobre a Pokédex.',
//     () => {
//       renderWithRouter(<About />);
//     });
  it('Testa se a página contém um heading h2 com o texto About Pokédex',
    () => {
      renderWithRouter(<About />);
      const titulo = screen.getByRole('heading',
        { name: 'About Pokédex',
          level: 2,
        });
      expect(titulo).toBeInTheDocument();
    });

  it('Testa se a página contém dois parágrafos com texto sobre a Pokédex.',
    () => {
      renderWithRouter(<About />);
      const text1 = screen.getByText('This application simulates '
      + 'a Pokédex, a digital encyclopedia containing all Pokémons');
      expect(text1).toBeInTheDocument();
      const text2 = screen.getByText('One can filter Pokémons by type, '
      + 'and see more details for each one of them');
      expect(text2).toBeInTheDocument();
    });
  it('Testa se a página contém a seguinte imagem de uma Pokédex',
    () => {
      renderWithRouter(<About />);
      const img = screen.getByRole('img');
      expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload'
      + '/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    });
});
