import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderPath from './utilities/renderPath';

describe('Teste se o componente Pokemon.js funciona corretamente', () => {
  const pokemonHREF = '/pokemons/25';

  test('Testa se os dados do pokemon sao exibidos corretamente', () => {
    renderPath('/');

    const nomeDoPokemon = screen.getByTestId('pokemon-name');
    const tipoDoPokemon = screen.getByTestId('pokemon-type');
    const pesoDoPokemon = screen.getByTestId('pokemon-weight');
    const imagemPokemon = screen.getByRole('img');

    const pokemonWeight = 'Average weight: 6.0 kg';

    expect(nomeDoPokemon.innerHTML).toMatch('Pikachu');
    expect(tipoDoPokemon.innerHTML).toMatch('Electric');
    expect(pesoDoPokemon.innerHTML).toMatch(pokemonWeight);
    expect(imagemPokemon.src).toMatch('https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(imagemPokemon.alt).toMatch('Pikachu sprite');
  });

  test('Testa se o componente pokemon possui um link para os detalhes', () => {
    renderPath('/');

    const linkToDetails = screen.getByRole('link', {
      name: 'More details',
    });

    expect(linkToDetails).toBeInTheDocument();
    expect(linkToDetails.href).toMatch(pokemonHREF);
  });

  test('Testa se ao clicar no link é direcionado para pagina de detalhes', () => {
    const { history } = renderPath('/');

    const linkToDetails = screen.getByRole('link', {
      name: 'More details',
    });

    userEvent.click(linkToDetails);
    history.push(pokemonHREF);

    const { location } = history;

    expect(location.pathname).toMatch(pokemonHREF);
  });

  test('Testa se os pokemons favoritados possuem o icone correto', () => {
    renderPath('/pokemons/25');

    const btnFavorite = screen.getByLabelText('Pokémon favoritado?');
    const btnHome = screen.getByRole('link', {
      name: 'Home',
    });

    userEvent.click(btnFavorite);
    userEvent.click(btnHome);

    const starIcon = screen.getAllByRole('img');

    expect(starIcon[1]).toBeInTheDocument();
    expect(starIcon[1].alt).toMatch('Pikachu is marked as favorite');
    expect(starIcon[1].src).toMatch('/star-icon.svg');
  });
});
