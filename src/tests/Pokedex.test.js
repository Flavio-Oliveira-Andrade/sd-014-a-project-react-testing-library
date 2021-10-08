import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(ui, { wrapper: BrowserRouter });
};

describe('Testa a pagina de Pokedex', () => {
  beforeEach(() => renderWithRouter(<App />));
  it('Testa se página contém um heading h2 com o texto Encountered pokémons', () => {
    const h2 = screen.getByText(/Encountered pokémons/i);
    expect(h2).toBeInTheDocument();
  });

  it('Testa se é exibido o próximo Poke da lista quando se clica no botão de ->.', () => {
    const next = screen.getByTestId('next-pokemon');
    expect(next).toBeInTheDocument();
    expect(next.innerHTML).toBe(/Próximo pokémon/i);
    const nextPoke = screen.getByTestId(nameId);
    userEvent.click(next);
    expect(nextPoke).toHaveTextContent(/Charmander/i);
  });

  it('Testa se é mostrado apenas um Pokémon por vez.', () => {
    const pokemon = screen.getAllByRole('img');
    expect(pokemon).toHaveLength(1);
  });

  it('Testa se a Pokédex tem os botões de filtro.', () => {
    const FILTER_BUTTONS_QTD = 8;
    const botoes = screen.getAllByClass('filter-button');
    expect(botoes).toBeInTheDocument();
    expect(botoes).toHaveLength(FILTER_BUTTONS_QTD);

    const eletricType = screen.getByTestId('pokemon-type');
    expect(eletricType).toHaveTextContent(/eletric/i);

    const type = screen.getAllByTestId('pokemon-type-button');
    expect(type[1]).toHaveTextContent(/fire/i);

    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeVisible();
  });

  it('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    const allButton = screen.getByRole('button', { name: 'All' });
    expect(allButton).toBeInTheDocument();
    userEvent.click(allButton);
    const pokemonInicial = screen.getByTestId(nameId);
    expect(pokemonInicial).toHaveTextContent(/pikachu/i);
  });
});
