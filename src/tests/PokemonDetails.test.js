import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './utils/renderWithRouter';
import pokemons from '../data';
import App from '../App';

describe('Elementos do componente  <PokemonDetails />', () => {
  it('As informações detalhadas do Pokémon selecionado são mostradas na tela.', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);

    const textDetails = screen.getByRole('heading', { name: /pikachu details/i });
    const headingSumary = screen.getByRole('heading', { name: /summary/i });
    const textSumary = screen.getByText(/this intelligent pokémon roasts/i);

    expect(textDetails).toBeInTheDocument();
    expect(linkDetails).not.toBeInTheDocument();
    expect(headingSumary).toBeInTheDocument();
    expect(textSumary).toBeInTheDocument();
  });
  it('Existe na página uma seção com mapas contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);
    const { foundAt } = pokemons[0];
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);

    const heading = screen.getByRole(
      'heading', { name: /game locations of pikachu/i, level: 2,
      },
    );
    expect(heading).toBeInTheDocument();
    // Logica do Victor de Paula:https://github.com/tryber/sd-014-a-project-react-testing-library/pull/8/commits/1084d646b8214d0050d95f198c66d32be908962f
    foundAt.forEach(({ location, map }, index) => {
      const textLocal = screen.getByText(location);
      expect(textLocal).toBeInTheDocument();

      const imagelocal = screen.getAllByAltText(/Pikachu location/);
      expect(imagelocal[index]).toHaveAttribute('src', map);
      expect(imagelocal[index]).toHaveAttribute('alt', 'Pikachu location');
    });
  });

  it('O usuário pode favoritar um pokémon através da página de detalhes', () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByRole('link', { name: /more details/i });
    userEvent.click(linkDetails);
    const btnCheckBox = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    const labelCheckBox = screen.getByLabelText(/Pokémon favoritado?/);

    userEvent.click(btnCheckBox);
    const favorited = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(favorited).toBeInTheDocument();

    userEvent.click(btnCheckBox);
    expect(favorited).not.toBeInTheDocument();

    expect(btnCheckBox).toBeInTheDocument();
    expect(labelCheckBox).toBeInTheDocument();
  });
});
