import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { About } from '../components';

describe('2 - Teste se a página contém as informações sobre a Pokédex', () => {
  it('Teste a presença de alguns contéudos',
    () => {
      render(
        <MemoryRouter>
          <About />
        </MemoryRouter>,
      );
      const header = screen.getByRole('heading', {
        level: 2,
        name: /About Pokédex/i,
      });
      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
      expect(header).toBeInTheDocument();

      expect(screen.getByText(/This application simulates/i)).toBeInTheDocument();
      expect(screen.getByText(/One can filter Pokémons/i)).toBeInTheDocument();


    });
});
