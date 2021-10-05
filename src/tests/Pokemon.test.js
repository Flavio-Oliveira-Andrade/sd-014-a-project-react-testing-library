import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { MemoryRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import App from '../App';
import pokemons from '../data';

const details = 'More details';

describe('Teste o componente `<Pokemon.js />`', () => {
  const {
    name,
    type,
    averageWeight: { value, measurementUnit },
    image,
  } = pokemons[0];
  it('Teste se um card com as informações de um pokémon é renderizado.', () => {
    render(<App />, { wrapper: MemoryRouter });
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type);
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(name);
    expect(screen.getByTestId('pokemon-weight')).toHaveTextContent(
      `Average weight: ${value} ${measurementUnit}`,
    );
    expect(screen.getByAltText(`${name} sprite`)).toHaveAttribute('src', image);
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém um link de navegação', () => {
    render(<App />, { wrapper: MemoryRouter });
    const detailsButton = screen.getByText(details);
    expect(detailsButton).toBeInTheDocument();
    fireEvent.click(detailsButton);
    const summaryHeader = screen.getByRole('heading', { name: /summary/i });
    expect(summaryHeader).toBeInTheDocument();
  });

  it('Teste o se o Url de navegação é alterado', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    const detailsButton = screen.getByText(details);
    fireEvent.click(detailsButton);
    const actualUrl = history.location.pathname;
    expect(actualUrl).toBe('/pokemons/25');
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => {
    render(<App />, { wrapper: MemoryRouter });
    const detailsButton = screen.getByText(details);
    fireEvent.click(detailsButton);
    const addfavorite = screen.getByText(/pokémon favorito?/i);
    fireEvent.click(addfavorite);
    const starLink = '/star-icon.svg';
    const star = screen.getByAltText(`${name} is marked as favorite`);
    expect(star.src).toContain(starLink);
  });
});
