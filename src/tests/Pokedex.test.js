import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App';

const ButtonNext = 'next-pokemon';

describe.skip('5. Teste o componente `<Pokedex.js />`', () => {
  it('Teste se página contém um heading `h2` com o texto `Encountered pokémons`.', () => {
    render(
      <Router>
        <App />
      </Router>,
    );

    expect(screen.getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    })).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista'
   + 'quando o botão `Próximo pokémon` é clicado.', () => {
    render(
      <Router>
        <App />
      </Router>,
    );

    userEvent.click(screen.getByTestId(ButtonNext));
    expect(screen.getByAltText('Charmander sprite'))
      .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');

    expect(screen.getByTestId((ButtonNext)))
      .toHaveTextContent('Próximo pokémon');

    userEvent.click(screen.getByTestId(ButtonNext));
    expect(screen.getByAltText('Caterpie sprite'))
      .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png');

    userEvent.click(screen.getByTestId(ButtonNext));
    expect(screen.getByAltText('Ekans sprite'))
      .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/1/18/Spr_5b_023.png');

    userEvent.click(screen.getByTestId(ButtonNext));
    expect(screen.getByAltText('Alakazam sprite'))
      .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/8/88/Spr_5b_065_m.png');

    userEvent.click(screen.getByTestId(ButtonNext));
    expect(screen.getByAltText('Mew sprite'))
      .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/4/43/Spr_5b_151.png');

    userEvent.click(screen.getByTestId(ButtonNext));
    expect(screen.getByAltText('Rapidash sprite'))
      .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/5/58/Spr_5b_078.png');

    userEvent.click(screen.getByTestId(ButtonNext));
    expect(screen.getByAltText('Snorlax sprite'))
      .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/4/40/Spr_5b_143.png');

    userEvent.click(screen.getByTestId(ButtonNext));
    expect(screen.getByAltText('Dragonair sprite'))
      .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/2/2c/Spr_5b_148.png');

    userEvent.click(screen.getByTestId(ButtonNext));
    expect(screen.getByAltText('Pikachu sprite'))
      .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  // it.skip('- Teste se é mostrado apenas um Pokémon por vez.', () => {
  //   render(
  //     <Router>
  //       <App />
  //     </Router>,
  //   );

  //   expect(screen.getAllByTestId('pokemon-type-button')).toBeInTheDocument();
  // });

  it('Teste se a Pokédex tem os botões de filtro.', () => {
    render(
      <Router>
        <App />
      </Router>,
    );

    expect(screen.getByRole('button', { name: 'Electric' }))
      .toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Fire' }))
      .toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Bug' }))
      .toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Poison' }))
      .toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Psychic' }))
      .toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Normal' }))
      .toBeInTheDocument();

    expect(screen.getByRole('button', { name: 'Dragon' }))
      .toBeInTheDocument();

    expect(screen.getByText('All')).toBeInTheDocument();
  });

  it('Teste se a Pokédex contém um botão para resetar o filtro', () => {
    render(
      <Router>
        <App />
      </Router>,
    );

    userEvent.click(screen.getByText('All'));
    expect(screen.getByAltText('Pikachu sprite'))
      .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
});
