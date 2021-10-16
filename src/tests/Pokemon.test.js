import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RenderWithRouter from '../util/RenderWithRouter';
import App from '../App';
import pokemons from '../data';

const moreDetails = 'More details';

describe('testando o Pokemon.js => ', () => {
  test('teste renderizando as informações do pokemon', () => {
    RenderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', {
      name: moreDetails,
    });
    userEvent.click(linkMoreDetails);

    const nomePokemon = screen.getByTestId('pokemon-name');
    expect(nomePokemon.innerHTML).toBe('Pikachu');

    const typepokemon = screen.getByTestId('pokemon-type').innerHTML;
    expect(typepokemon).toBe('Electric');

    const pesoPokemon = screen.getByTestId('pokemon-weight');
    expect(pesoPokemon).toHaveTextContent(
      `Average weight: ${
        pokemons[0].averageWeight.value} ${pokemons[0].averageWeight.measurementUnit}`,
    );
  });
  test('testando a exibição do link, url e o id do pokemon', () => {
    RenderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', {
      name: moreDetails,
    });
    expect(linkMoreDetails).toBeInTheDocument();
    expect(linkMoreDetails).toHaveAttribute('href', `/pokemons/${pokemons[0].id}`);
    // vi um link no codigo de um colega do curso q me ajudou nessa questão
    // https://github.com/testing-library/jest-dom#tohaveattribute
  });

  test('teste para renderizar a pagina de detalhes do pokemon', () => {
    RenderWithRouter(<App />);
    const linkPokMoreDetails = screen.getByRole('link', {
      name: moreDetails,
    });
    expect(linkPokMoreDetails).toBeInTheDocument();

    userEvent.click(linkPokMoreDetails);
    const pokemonDetails = screen.getByRole('heading', {
      name: `${pokemons[0].name} Details`,
    });
    const imgpok = screen.getAllByRole('img');

    expect(pokemonDetails).toBeInTheDocument();
    expect(imgpok[0]).toBeInTheDocument();
    expect(imgpok[0]).toHaveAttribute('src', `${pokemons[0].image}`);
    expect(imgpok[0]).toHaveAttribute('alt', `${pokemons[0].name} sprite`);

    const inputFavorito = screen.getByRole('checkbox', {
      name: 'Pokémon favoritado?',
    });
    userEvent.click(inputFavorito);
    const imgFavoritoPok = screen.getAllByRole('img')[1];
    expect(imgFavoritoPok).toBeInTheDocument();
    expect(imgFavoritoPok).toHaveAttribute('alt', `${
      pokemons[0].name} is marked as favorite`);
    expect(imgFavoritoPok).toHaveAttribute('src', '/star-icon.svg');
  });
});
