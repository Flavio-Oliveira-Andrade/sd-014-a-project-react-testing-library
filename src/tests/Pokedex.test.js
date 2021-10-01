import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import pokemons from '../data';
import App from '../App';

describe('Testa o componente <Pokedex.js />', () => {
  it('Testa se página contém um heading h2 com o texto Encountered pokémons.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const heading = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it('Testa se é exibido o próximo Pokémon quando o botão Próximo é clicado.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const pokemonName = screen.getByTestId('pokemon-name');
    const nextButton = screen.getByTestId('next-pokemon');

    expect(pokemonName).toHaveTextContent(pokemons[0].name);

    expect(nextButton).toBeInTheDocument();
    fireEvent.click(nextButton);

    expect(pokemonName).toHaveTextContent(pokemons[1].name);
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const pokemonName = screen.getAllByTestId(/pokemon-name/);
    expect(pokemonName).toHaveLength(1);
  });

  it('Testa se a Pokédex tem os botões de filtro.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const appTypes = [];
    const types = ['Electric', 'Fire', 'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    const typeButtons = screen.getAllByTestId('pokemon-type-button');

    typeButtons.forEach((type) => appTypes.push(type.innerHTML));
    expect(appTypes).toStrictEqual(types);
  });

  it('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );

    const { name, type, averageWeight: { value, measurementUnit } } = pokemons[0];
    const allTypes = screen.getByRole('button', { name: /all/i });
    const pokemonName = screen.getByTestId('pokemon-name');
    const pokemonType = screen.getByTestId('pokemon-type');
    const pokemonWeight = screen.getByTestId('pokemon-weight');

    expect(allTypes).toBeInTheDocument();
    expect(allTypes.innerHTML).toBe('All');

    fireEvent.click(allTypes);
    expect(pokemonName).toHaveTextContent(name);
    expect(pokemonType).toHaveTextContent(type);
    expect(pokemonWeight).toHaveTextContent(
      `Average weight: ${value} ${measurementUnit}`,
    );
  });
});
