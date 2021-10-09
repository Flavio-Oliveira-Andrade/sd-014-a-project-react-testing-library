import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(ui, { wrapper: BrowserRouter });
};

const nameId = 'pokemon-name';

describe('Testa a pagina de Pokedex', () => {
  beforeEach(() => renderWithRouter(<App />));
  it('Testa se página contém um heading h2 com o texto Encountered pokémons', () => {
    const h2 = screen.getByText(/Encountered pokémons/i);
    expect(h2).toBeInTheDocument();
  });

  it('Testa se é exibido o próximo Poke da lista quando se clica no botão de ->.', () => {
    const next = screen.getByTestId('next-pokemon');
    expect(next).toBeInTheDocument();
    expect(next.innerHTML).toBe('Próximo pokémon');
    const nextPoke = screen.getByTestId(nameId);
    userEvent.click(next);
    expect(nextPoke).toHaveTextContent(/Charmander/i);
  });

  it('Testa se é mostrado apenas um Pokémon por vez.', () => {
    const pokemon = screen.getAllByRole('img');
    expect(pokemon).toHaveLength(1);
  });

  it('Testa se a Pokédex tem os botões de filtro.', () => {
    const TYPES_BUTTONS = 7;

    const pokemonsTypes = ['Electric', 'Fire',
      'Bug', 'Poison', 'Psychic', 'Normal', 'Dragon'];
    pokemonsTypes.forEach((type) => expect(screen.getByRole('button', { name: type }))
      .toBeInTheDocument());

    const typeButton = screen.getAllByTestId('pokemon-type-button');
    expect(typeButton).toHaveLength(TYPES_BUTTONS);
    expect(typeButton[1]).toHaveTextContent(/fire/i);

    userEvent.click(typeButton[2]);
    const pokemon = screen.getByTestId(nameId);
    expect(pokemon).toHaveTextContent(/Caterpie/i);

    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeVisible();
  });

  it('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toHaveTextContent('All');
    expect(allButton).toBeInTheDocument();
    userEvent.click(allButton);
    const pokemonInicial = screen.getByTestId(nameId);
    expect(pokemonInicial).toHaveTextContent(/pikachu/i);
  });
});
