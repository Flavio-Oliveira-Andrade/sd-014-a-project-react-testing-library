import React from 'react';
import { cleanup, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './renderWithRouter';
import App from '../App';
import pokemons from '../data';

const {
  name,
  type,
  image,
  id,
  averageWeight: { value, measurementUnit } } = pokemons[0];

describe('6. Teste o componente <Pokemon.js />:', () => {
  afterEach(() => {
    cleanup();
  });

  it('6.1. se é renderizado um card com as informações de determinado pokémon.',
    () => {
      renderWithRouter(<App />);

      const textInAverage = `Average weight: ${value} ${measurementUnit}`;
      const pokeNameElement = screen.getByTestId('pokemon-name');
      const pokeTypeElement = screen.getByTestId('pokemon-type');
      const pokeAvgElement = screen.getByTestId('pokemon-weight');
      const pokeImageElement = screen.getByAltText(`${name} sprite`);

      expect(pokeNameElement).toBeInTheDocument();
      expect(pokeNameElement).toHaveTextContent(name);

      expect(pokeTypeElement).toBeInTheDocument();
      expect(pokeTypeElement).toHaveTextContent(type);

      expect(pokeAvgElement).toBeInTheDocument();
      expect(pokeAvgElement).toHaveTextContent(textInAverage);

      expect(pokeImageElement).toBeInTheDocument();
      expect(pokeImageElement).toHaveAttribute('src', image);
    });

  it('6.2. se o card do Pokémon indicado na Pokédex contém um '
  + 'link de navegação para exibir detalhes deste Pokémon',
  () => {
    renderWithRouter(<App />);

    const linkElement = screen.getByRole('link', { name: /more details/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', `/pokemons/${id}`);
  });

  it('6.3. se ao clicar no link de navegação do Pokémon, '
  + 'é feito o redirecionamento da aplicação para a página '
  + 'de detalhes de Pokémon; se a URL exibida no navegador '
  + 'muda para /pokemon/<id>, onde <id> é o id do Pokémon '
  + ' cujos detalhes se deseja ver; se existe um ícone de '
  + 'estrela nos Pokémons favoritados. ',
  () => {
    const { history } = renderWithRouter(<App />);

    const linkElement = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkElement);

    const heading = screen.getByRole('heading', { level: 2, name: /summary/i });
    expect(heading).toBeInTheDocument();

    expect(history.location.pathname).toBe(`/pokemons/${id}`);

    const checkInput = screen.getByRole('checkbox');
    userEvent.click(checkInput);

    const starIconElement = screen.getByAltText(`${name} is marked as favorite`);
    expect(starIconElement).toBeInTheDocument();
    expect(starIconElement).toHaveAttribute('src', '/star-icon.svg');
  });
});
