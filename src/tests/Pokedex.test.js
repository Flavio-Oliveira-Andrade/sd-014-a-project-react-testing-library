import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

const nextPokemonBtn = () => screen.getByTestId('next-pokemon');
const fireTypeBtn = () => screen.getByRole('button', { name: 'Fire' });
const allBtn = () => screen.getByRole('button', { name: 'All' });
const nonFilteredPokemonList = ['Pikachu', 'Charmander', 'Caterpie', 'Ekans'];

it('verifica se a página contém um "h2" com o texto'
  + ' "Encountered pokémons"', () => {
  renderWithRouter(<App />);
  const heading = screen.getByRole(
    'heading', { level: 2, name: 'Encountered pokémons' },
  );
  expect(heading).toBeInTheDocument();
});

describe('Verifica se é exibido o próximo Pokémon da lista '
+ 'quando o botão "Próximo pokémon" é clicado', () => {
  it('O botão deve conter o texto Próximo pokémon', () => {
    renderWithRouter(<App />);
    expect(nextPokemonBtn()).toBeInTheDocument();
  });

  it('Os próximos Pokémons da lista devem ser mostrados, '
  + 'um a um, ao clicar sucessivamente no botão', () => {
    renderWithRouter(<App />);
    expect(screen.queryByText('Pikachu')).toBeInTheDocument();
    userEvent.click(nextPokemonBtn());
    expect(screen.queryByText('Charmander')).toBeInTheDocument();
    expect(screen.queryByText('Pikachu')).toBeNull();
  });

  it('Se estiver no último Pokémon da lista, '
  + 'o primeiro Pokémon da lista deve ser mostrado, ao clicar no botão', () => {
    renderWithRouter(<App />);
    const CLICKS_TO_FIRST_POKEMON = 9;
    for (let i = 1; i <= CLICKS_TO_FIRST_POKEMON; i += 1) {
      userEvent.click(nextPokemonBtn());
    }
    expect(screen.queryByText('Pikachu')).toBeInTheDocument();
  });
});

describe('Verifica se a Pokédex tem os botões de filtro.', () => {
  it('Deve existir um botão de filtragem para cada tipo de Pokémon,'
  + ' sem repetição.', () => {
    renderWithRouter(<App />);
    const typeButtons = screen.getAllByTestId('pokemon-type-button');
    typeButtons.forEach((element, index) => {
      expect(element).not.toEqual(typeButtons[index + 1]);
    });
  });

  /**
   * Usei, no teste acima, a mesma lógica criada pelo Rodolfo Pinheiro
   * Link do repositório: https://github.com/tryber/sd-014-a-project-react-testing-library/pull/97/commits/76b955c082d1f8d0e62eeb0eb1ce4ffb23a6ead5
   */

  it('A partir da seleção de um botão de tipo, '
  + 'a Pokédex deve circular somente pelos pokémons daquele tipo', () => {
    renderWithRouter(<App />);
    userEvent.click(fireTypeBtn());
    expect(screen.getByText('Charmander')).toBeInTheDocument();
    userEvent.click(nextPokemonBtn());
    expect(screen.getByText('Rapidash')).toBeInTheDocument();
  });
  it('O botão All precisa estar sempre visível', () => {
    renderWithRouter(<App />);
    userEvent.click(fireTypeBtn());
    expect(allBtn()).toBeInTheDocument();
  });
});

describe('Verifica se a Pokédex contém um botão para resetar o filtro', () => {
  it('O texto do botão deve ser All', () => {
    renderWithRouter(<App />);
    expect(allBtn()).toBeInTheDocument();
  });

  it('A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros) '
  + 'quando o botão All for clicado', () => {
    renderWithRouter(<App />);
    userEvent.click(fireTypeBtn());
    expect(screen.getByText('Charmander')).toBeInTheDocument();

    userEvent.click(allBtn());
    nonFilteredPokemonList.forEach((pokemon) => {
      expect(screen.getByText(pokemon)).toBeInTheDocument();
      userEvent.click(nextPokemonBtn());
    });
  });

  it('Ao carregar a página, o filtro selecionado deverá ser All', () => {
    renderWithRouter(<App />);
    nonFilteredPokemonList.forEach((pokemon) => {
      expect(screen.getByText(pokemon)).toBeInTheDocument();
      userEvent.click(nextPokemonBtn());
    });
  });
});
