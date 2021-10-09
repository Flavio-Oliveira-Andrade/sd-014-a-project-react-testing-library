// test('', () => {});
import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';

import App from '../App';
// import { Pokedex } from '../components';

describe('Teste o componente <Pokedex.js />', () => {
  test('Teste se página contém um h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);

    const title = screen.getByText(/Encountered pokémons/i);
    expect(title).toBeInTheDocument();
  });

  test('Teste se é exibido o próximo Pokémon da lista'
  + 'quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);

    const nextPocketMonster = screen.getByText(/próximo pok/i);

    fireEvent.click(nextPocketMonster);
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();

    fireEvent.click(nextPocketMonster);
    expect(screen.getByText(/caterpie/i)).toBeInTheDocument();

    fireEvent.click(nextPocketMonster);
    expect(screen.getByText(/ekans/i)).toBeInTheDocument();

    fireEvent.click(nextPocketMonster);
    expect(screen.getByText(/alakazam/i)).toBeInTheDocument();

    fireEvent.click(nextPocketMonster);
    expect(screen.getByText(/mew/i)).toBeInTheDocument();

    fireEvent.click(nextPocketMonster);
    expect(screen.getByText(/rapidash/i)).toBeInTheDocument();

    fireEvent.click(nextPocketMonster);
    expect(screen.getByText(/snorlax/i)).toBeInTheDocument();

    fireEvent.click(nextPocketMonster);
    expect(screen.getByText(/dragonair/i)).toBeInTheDocument();

    fireEvent.click(nextPocketMonster);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });

  test('Teste se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);

    const button = screen.getByText(/próximo pokémon/i);
    fireEvent.click(button);
    expect(screen.getAllByTestId('pokemon-name')).toHaveLength(1);
    expect(screen.getAllByTestId('pokemon-type')).toHaveLength(1);
  });

  test('Teste se a Pokédex tem os botões de filtro', () => {
    renderWithRouter(<App />);

    const nextPocketMonster = screen.getByText(/próximo pok/i);
    const all = screen.getByText(/all/i);
    const lintChatao = 7;

    expect(screen.getAllByTestId('pokemon-type-button')).toHaveLength(lintChatao);

    fireEvent.click(screen.getByRole('button', { name: /electric/i }));
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(nextPocketMonster).toBeDisabled();
    expect(all).toBeEnabled();

    fireEvent.click(screen.getByRole('button', { name: /fire/i }));
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
    expect(all).toBeEnabled();
    fireEvent.click(nextPocketMonster);
    expect(screen.getByText(/rapidash/i)).toBeInTheDocument();
    expect(all).toBeEnabled();

    fireEvent.click(screen.getByRole('button', { name: /bug/i }));
    expect(screen.getByText(/caterpie/i)).toBeInTheDocument();
    expect(nextPocketMonster).toBeDisabled();
    expect(all).toBeEnabled();

    fireEvent.click(screen.getByRole('button', { name: /poison/i }));
    expect(screen.getByText(/ekans/i)).toBeInTheDocument();
    expect(nextPocketMonster).toBeDisabled();
    expect(all).toBeEnabled();

    fireEvent.click(screen.getByRole('button', { name: /psychic/i }));
    expect(screen.getByText(/alakazam/i)).toBeInTheDocument();
    expect(all).toBeEnabled();
    fireEvent.click(nextPocketMonster);
    expect(screen.getByText(/mew/i)).toBeInTheDocument();
    expect(all).toBeEnabled();

    fireEvent.click(screen.getByRole('button', { name: /normal/i }));
    expect(screen.getByText(/snorlax/i)).toBeInTheDocument();
    expect(nextPocketMonster).toBeDisabled();
    expect(all).toBeEnabled();

    fireEvent.click(screen.getByRole('button', { name: /dragon/i }));
    expect(screen.getByText(/dragonair/i)).toBeInTheDocument();
    expect(nextPocketMonster).toBeDisabled();
    expect(all).toBeEnabled();
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const all = screen.getByText(/all/i);
    const nextPocketMonster = screen.getByText(/próximo pok/i);
    expect(all).toBeInTheDocument();
    fireEvent.click(all);

    expect(nextPocketMonster).toBeInTheDocument();

    fireEvent.click(nextPocketMonster);
    expect(all).toBeInTheDocument();

    fireEvent.click(nextPocketMonster);
    expect(all).toBeInTheDocument();

    fireEvent.click(nextPocketMonster);
    expect(all).toBeInTheDocument();

    fireEvent.click(nextPocketMonster);
    expect(all).toBeInTheDocument();

    fireEvent.click(nextPocketMonster);
    expect(all).toBeInTheDocument();

    fireEvent.click(nextPocketMonster);
    expect(all).toBeInTheDocument();

    fireEvent.click(nextPocketMonster);
    expect(all).toBeInTheDocument();

    fireEvent.click(nextPocketMonster);
    expect(all).toBeInTheDocument();

    fireEvent.click(nextPocketMonster);
    expect(all).toBeInTheDocument();
  });
});
