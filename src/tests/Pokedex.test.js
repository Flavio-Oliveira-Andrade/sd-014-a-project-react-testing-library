import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderPath from './utilities/renderPath';

describe('Testa se a pokedex funciona corretamente', () => {
  test('Teste se um contem um titulo h2 com o texto "Encountered Pokemons"', () => {
    renderPath('/');

    const titlePokedex = screen.getByText('Encountered pokémons');

    expect(titlePokedex).toBeInTheDocument();
  });

  test('Testa se o proximo pokemon é exibido quando clicado no botao "Prox poke"', () => {
    renderPath('/');

    const pokemonAtual = screen.getByText('Pikachu');
    const botaoProxPokemon = screen.getByText('Próximo pokémon');

    userEvent.click(botaoProxPokemon);

    expect(pokemonAtual.innerHTML).toMatch('Charmander');

    userEvent.click(botaoProxPokemon);

    expect(pokemonAtual.innerHTML).toMatch('Caterpie');

    userEvent.click(botaoProxPokemon);

    expect(pokemonAtual.innerHTML).toMatch('Ekans');

    userEvent.click(botaoProxPokemon);

    expect(pokemonAtual.innerHTML).toMatch('Alakazam');

    userEvent.click(botaoProxPokemon);

    expect(pokemonAtual.innerHTML).toMatch('Mew');

    userEvent.click(botaoProxPokemon);

    expect(pokemonAtual.innerHTML).toMatch('Rapidash');

    userEvent.click(botaoProxPokemon);

    expect(pokemonAtual.innerHTML).toMatch('Snorlax');

    userEvent.click(botaoProxPokemon);

    expect(pokemonAtual.innerHTML).toMatch('Dragonair');

    userEvent.click(botaoProxPokemon);

    expect(pokemonAtual.innerHTML).toMatch('Pikachu');
  });

  test('Testa se é exibido apenas um pokemon por vez', () => {
    renderPath('/');

    const pokemon = screen.getAllByTestId('pokemon-name');

    expect(pokemon).toHaveLength(1);
  });

  test('Testa se a aplicação contém os botões de filtro', () => {
    renderPath('/');

    const QUANTIDADE_DE_BUTOES = 7;
    const botoesDeFiltro = screen.getAllByTestId('pokemon-type-button');

    expect(botoesDeFiltro).toHaveLength(QUANTIDADE_DE_BUTOES);
  });

  test('Testa o funcionamento do botão All', () => {
    renderPath('/');

    const botaoAll = screen.getByText('All');
    const botaoFire = screen.getByRole('button', {
      name: 'Fire',
    });
    const pokemonPadrão = screen.getByTestId('pokemon-name');

    expect(pokemonPadrão.innerHTML).toMatch('Pikachu');

    userEvent.click(botaoFire);

    expect(pokemonPadrão.innerHTML).not.toMatch('Pikachu');

    userEvent.click(botaoAll);

    expect(pokemonPadrão.innerHTML).toMatch('Pikachu');
  });
});
