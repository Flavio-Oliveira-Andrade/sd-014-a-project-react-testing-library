import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  it('Testa se página contém um heading h2 com o texto Encountered pokémons.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const heading = screen.getByRole('heading', { name: /encountered pokémons/i });
    expect(heading).toBeInTheDocument();
  });

  it('Testa se é exibido o próximo Pokémon quando o botão Próximo é clicado.', () => {

  });

  it('Testa se é mostrado apenas um Pokémon por vez.', () => {

  });

  it('Testa se a Pokédex tem os botões de filtro.', () => {

  });

  it('Testa se a Pokédex contém um botão para resetar o filtro', () => {

  });
});
