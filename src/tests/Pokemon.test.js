import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen } from '@testing-library/react';
import renderWithRouter from '../render/renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Testa se aplicação é renderizada para o componente Pokemon', () => {
  test('Se o tipo correto do pokemon deve ser mostrado na tela.', () => {
    renderWithRouter(<App />);
    pokemons.forEach((pokemon) => {
      const typePokemon = screen.getByTestId('pokemon-type');
      expect(typePokemon.innerHTML).toBe(pokemon.type);
      const buttonTextProximoPokemon = screen.getByRole('button',
        {
          name: 'Próximo pokémon',
        });
      userEvent.click(buttonTextProximoPokemon);
    });
  });

  test('Se a imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a'
  + 'URL da imagem e um atributo alt com o texto <name> sprite, onde <name> é o nome do'
  + 'pokémon.', () => {
    renderWithRouter(<App />);
    pokemons.forEach((pokemon) => {
      const imagemPokemon = screen.getByRole('img',
        {
          name: `${pokemon.name} sprite`,
        });
      expect(imagemPokemon).toBeInTheDocument();
      expect(imagemPokemon.src).toBe(pokemon.image);
      const buttonTextProximoPokemon = screen.getByRole('button',
        {
          name: 'Próximo pokémon',
        });
      userEvent.click(buttonTextProximoPokemon);
    });
  });

  test('Se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir'
  + 'detalhes deste Pokémon. O link deve possuir a URL /pokemons/<id>, onde <id>'
  + 'é o id do Pokemon exibido.', () => {
    renderWithRouter(<App />);
    pokemons.forEach((pokemon) => {
      const linkTextMoreDetails = screen.getByRole('link',
        {
          name: 'More details',
        });
      expect(linkTextMoreDetails).toBeInTheDocument();
      expect(linkTextMoreDetails).toHaveAttribute('href', `/pokemons/${pokemon.id}`);
      const buttonTextProximoPokemon = screen.getByRole('button',
        {
          name: /Próximo pokémon/i,
        });
      userEvent.click(buttonTextProximoPokemon);
    });
  });

  test('Se existe um icone de estrela nos Pokémons favoritados.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('pokemons/25');
    const checkboxLabelPokemonFavoritado = screen.getByLabelText('Pokémon favoritado?');
    userEvent.click(checkboxLabelPokemonFavoritado);
    const imagemEstrela = screen.getByRole('img',
      {
        name: 'Pikachu is marked as favorite',
      });
    expect(imagemEstrela).toHaveAttribute('src', '/star-icon.svg');
  });
});
