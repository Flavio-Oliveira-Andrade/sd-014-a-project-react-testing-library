import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';
import pokemons from '../data';

describe('7º testa se o componente PokemonDetails esta funcionando corretamente', () => {
  const { name, summary } = pokemons[0];
  it('verifica se a pagina details renderiza as informações sobre o pokemon', () => {
    renderWithRouter(<App />);
    const moreDetails = screen.getByRole('link', { name: 'More details' });
    expect(moreDetails).toBeInTheDocument();
    userEvent.click(moreDetails);

    expect(moreDetails).not.toBeInTheDocument();
    const headingName = screen.getByRole('heading', { name: `${name} Details` });
    expect(headingName).toBeInTheDocument();

    const headingSummary = screen.getByRole('heading', { name: 'Summary' });
    expect(headingSummary).toBeInTheDocument();

    const summaryText = screen.getByText(summary);
    expect(summaryText).toBeInTheDocument();
  });
});
