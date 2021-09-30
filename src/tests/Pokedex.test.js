import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from '../App';

// https://testing-library.com/docs/example-react-router/#reducing-boilerplate
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);
  return render(ui, { wrapper: BrowserRouter });
};

describe('Testa o componente <Pokedex.js />', () => {
  test('Testa se página contém um heading h2 com o texto Encountered pokémons', () => {
    renderWithRouter(<App />);
    const homeTitle = screen.getByRole('heading', {
      level: 2,
      name: /encountered pokémons/i,
    });
    expect(homeTitle).toBeInTheDocument();
  });

  test('Testa se é exibido o próximo Pokémon da lista'
    + ' quando o botão Próximo pokémon é clicado', () => {
    renderWithRouter(<App />);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();

    const nextPoke = screen.getByTestId('next-pokemon');
    expect(nextPoke).toBeInTheDocument();

    fireEvent.click(nextPoke);
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
    expect(screen.getAllByTestId('pokemon-name')).toHaveLength(1);

    fireEvent.click(nextPoke);
    expect(screen.getByText(/caterpie/i)).toBeInTheDocument();

    fireEvent.click(nextPoke);
    expect(screen.getByText(/ekans/i)).toBeInTheDocument();

    fireEvent.click(nextPoke);
    expect(screen.getByText(/alakazam/i)).toBeInTheDocument();

    fireEvent.click(nextPoke);
    expect(screen.getByText(/mew/i)).toBeInTheDocument();

    fireEvent.click(nextPoke);
    expect(screen.getByText(/rapidash/i)).toBeInTheDocument();

    fireEvent.click(nextPoke);
    expect(screen.getByText(/snorlax/i)).toBeInTheDocument();

    fireEvent.click(nextPoke);
    expect(screen.getByText(/dragonair/i)).toBeInTheDocument();

    fireEvent.click(nextPoke);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });

  test('Testa se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    fireEvent.click(nextButton);
    expect(screen.getAllByTestId('pokemon-name')).toHaveLength(1);
  });

  test('Testa se a Pokédex tem os botões de filtro.', () => {
    renderWithRouter(<App />);
    const MAX_TYPES = 7;
    const nextButton = screen.getByRole('button', { name: /próximo pokémon/i });
    const allButton = screen.getByRole('button', { name: /all/i });
    expect(screen.getAllByTestId('pokemon-type-button')).toHaveLength(MAX_TYPES);

    const electric = screen.getByRole('button', { name: /electric/i });
    fireEvent.click(electric);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
    expect(nextButton).toBeDisabled();
    expect(allButton).toBeEnabled();

    const fire = screen.getByRole('button', { name: /fire/i });
    fireEvent.click(fire);
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();
    expect(allButton).toBeEnabled();
    fireEvent.click(nextButton);
    expect(screen.getByText(/rapidash/i)).toBeInTheDocument();
    expect(allButton).toBeEnabled();

    const bug = screen.getByRole('button', { name: /bug/i });
    fireEvent.click(bug);
    expect(screen.getByText(/caterpie/i)).toBeInTheDocument();
    expect(nextButton).toBeDisabled();
    expect(allButton).toBeEnabled();

    const poison = screen.getByRole('button', { name: /poison/i });
    fireEvent.click(poison);
    expect(screen.getByText(/ekans/i)).toBeInTheDocument();
    expect(nextButton).toBeDisabled();
    expect(allButton).toBeEnabled();

    const psychic = screen.getByRole('button', { name: /psychic/i });
    fireEvent.click(psychic);
    expect(screen.getByText(/alakazam/i)).toBeInTheDocument();
    expect(allButton).toBeEnabled();
    fireEvent.click(nextButton);
    expect(screen.getByText(/mew/i)).toBeInTheDocument();
    expect(allButton).toBeEnabled();

    const normal = screen.getByRole('button', { name: /normal/i });
    fireEvent.click(normal);
    expect(screen.getByText(/snorlax/i)).toBeInTheDocument();
    expect(nextButton).toBeDisabled();
    expect(allButton).toBeEnabled();

    const dragon = screen.getByRole('button', { name: /dragon/i });
    fireEvent.click(dragon);
    expect(screen.getByText(/dragonair/i)).toBeInTheDocument();
    expect(nextButton).toBeDisabled();
    expect(allButton).toBeEnabled();
  });

  test('Testa se a Pokédex contém um botão para resetar o filtro', () => {
    renderWithRouter(<App />);
    const allButton = screen.getByRole('button', { name: /all/i });
    expect(allButton).toBeInTheDocument();
    fireEvent.click(allButton);

    const nextPoke = screen.getByTestId('next-pokemon');
    expect(nextPoke).toBeInTheDocument();

    fireEvent.click(nextPoke);
    expect(screen.getByText(/charmander/i)).toBeInTheDocument();

    fireEvent.click(nextPoke);
    expect(screen.getByText(/caterpie/i)).toBeInTheDocument();

    fireEvent.click(nextPoke);
    expect(screen.getByText(/ekans/i)).toBeInTheDocument();

    fireEvent.click(nextPoke);
    expect(screen.getByText(/alakazam/i)).toBeInTheDocument();

    fireEvent.click(nextPoke);
    expect(screen.getByText(/mew/i)).toBeInTheDocument();

    fireEvent.click(nextPoke);
    expect(screen.getByText(/rapidash/i)).toBeInTheDocument();

    fireEvent.click(nextPoke);
    expect(screen.getByText(/snorlax/i)).toBeInTheDocument();

    fireEvent.click(nextPoke);
    expect(screen.getByText(/dragonair/i)).toBeInTheDocument();

    fireEvent.click(nextPoke);
    expect(screen.getByText(/pikachu/i)).toBeInTheDocument();
  });
});
