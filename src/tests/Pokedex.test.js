import React from 'react';
import { MemoryRouter } from 'react-router';
import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se página contém um h2 com o texto Encountered pokémons.', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const encounteredPokemons = screen.getByRole('heading', {
      level: 2,
      name: /Encountered pokémons/i,
    });
    expect(encounteredPokemons).toBeInTheDocument();
  });
  test('teste se o proximo pokemon é exibido ao clicar no botao ', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const proximoPokemon = screen.getByRole('button', { name: /Próximo pokémon/i });
    fireEvent.click(proximoPokemon);

    const Charmander = screen.getByText('Charmander');
    expect(Charmander).toBeInTheDocument();
  });
  test('O botão deve conter o texto Próximo pokémon ', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const proximoPokemon = screen.getByRole('button', { name: /Próximo pokémon/i });
    fireEvent.click(proximoPokemon);
  });
  test('Teste se a Pokédex tem os botões de filtro', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const all = screen.getByRole('button', { name: /All/i });
    const eletric = screen.getByRole('button', { name: /Electric/i });
    const fire = screen.getByRole('button', { name: /Fire/i });
    const bug = screen.getByRole('button', { name: /Bug/i });
    const poison = screen.getByRole('button', { name: /Poison/i });
    const psychic = screen.getByRole('button', { name: /Psychic/i });

    expect(all).toBeInTheDocument();
    expect(eletric).toBeInTheDocument();
    expect(fire).toBeInTheDocument();
    expect(bug).toBeInTheDocument();
    expect(poison).toBeInTheDocument();
    expect(psychic).toBeInTheDocument();
  });
  test('O texto do botão deve corresponder ao nome do tipo, ex. Psychic', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const Buttons = screen.getAllByTestId('pokemon-type-button');
    const pokemonType = screen.getByTestId('pokemon-type');
    fireEvent.click(Buttons[0]);
    expect(pokemonType.textContent).toBe(Buttons[0].textContent);
  });
  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>,
    );
    const AllButton = screen.getByRole('button', { name: /All/i });
    fireEvent.click(AllButton);

    const pikachu = screen.getByText('Pikachu');
    expect(pikachu).toBeInTheDocument();
  });
});
