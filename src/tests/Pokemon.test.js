import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

const pikachu = '/pokemons/25';
const details = 'More details';

describe('Teste o componente Pokemon', () => {
  it('Teste se é renderizado um card com as'
        + ' informações de determinado pokémon.', () => {
    renderWithRouter(<App />);
    const testIdName = screen.getByTestId('pokemon-name');
    expect(testIdName).toHaveTextContent('Pikachu');

    const typeId = screen.getByTestId('pokemon-type');
    expect(typeId).toHaveTextContent('Electric');

    const weightId = screen.getByTestId('pokemon-weight');
    expect(weightId).toHaveTextContent('Average weight: 6.0 kg');

    const alt = screen.getByAltText('Pikachu sprite');
    const url = 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png';
    expect(alt).toHaveAttribute('src', url);
  });
  it('Teste o link de detalhes', () => {
    renderWithRouter(<App />);

    expect(screen.getByRole('link', { name: details })).toHaveAttribute('href', pikachu);
  });

  it('Teste click no link de detalhes', () => {
    renderWithRouter(<App />);

    fireEvent.click(screen.getByRole('link', { name: details }));
    const name = screen.getByText('Pikachu Details');
    expect(name).toBeInTheDocument();
  });

  it('Teste se a url muda', () => {
    const { history } = renderWithRouter(<App />);

    fireEvent.click(screen.getByRole('link', { name: details }));
    const { pathname } = history.location;
    expect(pathname).toBe(pikachu);
  });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    const { history } = renderWithRouter(<App />);

    history.push(pikachu);
    fireEvent.click(screen.getByText('Pokémon favoritado?')); // https://ateliware.com/blog/testes-em-reactjs
    expect(screen.getByLabelText('Pokémon favoritado?')).toBeChecked();

    const alt = screen.getByAltText('Pikachu is marked as favorite');
    const url = '/star-icon.svg';

    expect(alt).toHaveAttribute('src', url);
  });
});
