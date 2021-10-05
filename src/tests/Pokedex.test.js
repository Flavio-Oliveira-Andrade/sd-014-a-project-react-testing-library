import React from 'react';
import { screen } from '@testing-library/react';
import { fireEvent } from '@testing-library/dom';
import App from '../App';
import historyRouter from '../services/historyRouter';

describe('Teste o componente `<Pokedex.js />`', () => {
  it('página contém um heading `h2` com o texto `Encountered pokémons`', () => {
    historyRouter(<App />);
    const h2Pkm = screen.getByRole('heading', {
      name: /Encountered pokémons/i,
      level: 2,
    });
    expect(h2Pkm).toBeInTheDocument();
  });
  it('Teste se é exibido o próximo Pokémon da lista quando o botão'
    + '`Próximo pokémon` é clicado.', () => {
    historyRouter(<App />);
    const proximoPkm = screen.getByRole('button', { name: /Próximo pokémon/i });

    fireEvent.click(proximoPkm);

    const PkmCharmander = screen.getByText('Charmander');
    expect(PkmCharmander).toBeInTheDocument();
  });
  it('O botão deve conter o texto `Próximo pokémon`', () => {
    historyRouter(<App />);
    const textoBtn = screen.getByRole('button', { name: 'Próximo pokémon' });
    expect(textoBtn).toBeInTheDocument();
  });
  it('Teste se a Pokédex tem os botões de filtro.', () => {
    historyRouter(<App />);

    const typeAll = screen.getByRole('button', { name: /All/i });
    const typeEletric = screen.getByRole('button', { name: /Electric/i });
    const typeFire = screen.getByRole('button', { name: /Fire/i });
    const typeBug = screen.getByRole('button', { name: /Bug/i });
    const typePoison = screen.getByRole('button', { name: /Poison/i });
    const typePsychic = screen.getByRole('button', { name: /Psychic/i });

    expect(typeAll).toBeInTheDocument();
    expect(typeEletric).toBeInTheDocument();
    expect(typeFire).toBeInTheDocument();
    expect(typeBug).toBeInTheDocument();
    expect(typePoison).toBeInTheDocument();
    expect(typePsychic).toBeInTheDocument();
  });
  it('A partir da seleção de um botão de tipo, a Pokédex deve'
    + 'circular somente pelos pokémons daquele tipo', () => {
    historyRouter(<App />);
    const cardId = screen.getByTestId('pokemon-type');
    const buttonId = screen.getAllByTestId('pokemon-type-button');
    const allSelect = screen.getByRole('button', { name: /all/i });

    expect(cardId).toBeInTheDocument();
    expect(buttonId[0]).toBeInTheDocument();

    fireEvent.click(buttonId[0]);

    expect(cardId.innerHTML).toBe(buttonId[0].innerHTML);

    fireEvent.click(allSelect);
    expect(allSelect.innerHTML).not.toBe(cardId.innerHTML);
  });
});
