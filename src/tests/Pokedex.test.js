import React from 'react';
import { screen } from '@testing-library/react';
import fireEvent from '@testing-library/user-event';
import renderWithRouter from '../services/RenderWithRouter';
import App from '../App';

describe('Testa o componente <Pokedex.js/>', () => {
  test('Testa se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const text = screen.getByRole('heading', { level: 2, name: /Encountered pokémons/i });
    expect(text).toBeInTheDocument();
  });
  test('Testa se é exibido o próximo Pokémon quando o botão Próximo é clicado.', () => {
    renderWithRouter(<App />);
    const botao = screen.getByRole('button', { name: /próximo pokémon/i });
    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toHaveTextContent('Pikachu');
    fireEvent.click(botao);
    expect(pokemon).toHaveTextContent('Charmander');
  });
  test('O botão deve conter o texto Próximo pokémon', () => {
    renderWithRouter(<App />);
    const text = screen.getByRole('button', { name: /próximo pokémon/i });
    expect(text).toBeInTheDocument();
  });
  test('Os próximos Pokémons da lista devem ser mostrados, ao clicar no botão;', () => {
    renderWithRouter(<App />);
    const botao = screen.getByRole('button', { name: /próximo pokémon/i });
    const pokemon = screen.getByTestId('pokemon-name');
    expect(pokemon).toHaveTextContent('Pikachu');
    fireEvent.click(botao);
    expect(pokemon).toHaveTextContent('Charmander');
    fireEvent.click(botao);
    expect(pokemon).toHaveTextContent('Caterpie');
    fireEvent.click(botao);
    expect(pokemon).toHaveTextContent('Ekans');
  });
  test('Testa se é mostrado apenas um Pokémon por vez.', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon.length).toBe(1); // OU toHaveLength(1);
  });
  test('Testa se há os botões de filtro e um para cada tipo de Pokémon', () => {
    renderWithRouter(<App />);
    const numBtn = 7;
    const btns = screen.getAllByTestId('pokemon-type-button');
    expect(btns[0].innerHTML).toBe('Electric');
    expect(btns[1].innerHTML).toBe('Fire');
    expect(btns[2].innerHTML).toBe('Bug');
    expect(btns[3].innerHTML).toBe('Poison');
    expect(btns[4].innerHTML).toBe('Psychic');
    expect(btns[5].innerHTML).toBe('Normal');
    expect(btns[6].innerHTML).toBe('Dragon');
    expect(btns.length).toBe(numBtn);
  });
  test('a Pokédex deve circular somente pelos pokémons daquele tipo;', () => {
    renderWithRouter(<App />);
    const btn = screen.getByRole('button', { name: /psychic/i });
    const pokemon = screen.getByTestId('pokemon-type');
    fireEvent.click(btn);
    expect(pokemon).toHaveTextContent('Psychic');
    expect(btn).toHaveTextContent('Psychic');
    expect(pokemon.innerHTML).not.toBe('Eletric');
  });
  test('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const btn = screen.getByRole('button', { name: /all/i });
    const pokemon = screen.getByTestId('pokemon-name');
    expect(btn).toBeInTheDocument();
    expect(btn).toBeVisible();
    fireEvent.click(btn);
    expect(pokemon).toHaveTextContent('Pikachu');
  });
});
