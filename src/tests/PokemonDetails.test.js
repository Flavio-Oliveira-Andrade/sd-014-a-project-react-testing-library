import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import data from '../data';

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(ui, { wrapper: BrowserRouter });
};

const pokemonInfo = data[0];
const { name, summary, foundAt } = pokemonInfo;

describe('Testa o componente <PokemonDetails.js />', () => {
  beforeEach(() => renderWithRouter(<App />));
  it('Testa se as informações detalhadas do Pokémon selecionado são mostradas.', () => {
    userEvent.click(screen.getByRole('link', { name: 'More details' }));

    expect(screen.getByText(`${name} Details`))
      .toBeInTheDocument();

    expect(screen.queryByText('More details'))
      .not.toBeInTheDocument();

    expect(screen.getAllByRole('heading', { level: 2 })[1].textContent)
      .toBe('Summary');

    const h2 = screen.getByRole('heading', { name: 'Summary', level: 2 });
    expect(h2).toBeInTheDocument();

    const detailsTxt = screen.getByText(`${summary}`);
    expect(detailsTxt).toBeInTheDocument();
  });

  it('Testa se existem os mapas contendo as localizações do pokémon', () => {
    const moreDetailsBtn = screen.getByText(/more details/i);
    userEvent.click(moreDetailsBtn);

    const h2 = screen.getAllByRole('heading', { level: 2 });
    expect(h2[2].textContent).toBe(`Game Locations of ${name}`);

    foundAt.forEach((loc, i) => {
      expect(screen.getByText(loc.location))
        .toBeInTheDocument();

      expect(screen.getAllByAltText(`${name} location`)[i].src)
        .toBe(loc.map);
    });

    const maps = screen.getAllByAltText(`${name} location`);
    expect(maps).toHaveLength(foundAt.length);
  });

  it('Testa se o usuário pode favoritar um pokémon pela página de detalhes.', () => {
    const moreDetailsBtn = screen.getByText(/more details/i);
    userEvent.click(moreDetailsBtn);

    const checkbox = screen.getByText('Pokémon favoritado?');
    userEvent.click(checkbox);

    const favIcon = screen.getByAltText('Pikachu is marked as favorite');

    expect(favIcon).toBeInTheDocument();
    userEvent.click(checkbox);
    expect(favIcon).not.toBeInTheDocument();
  });
});
