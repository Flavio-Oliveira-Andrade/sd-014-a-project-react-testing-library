import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App';

const ButtonNext = 'next-pokemon';

describe('5. Teste o componente `<Pokedex.js />`', () => {
  it('Teste se página contém um heading `h2` com o texto `Encountered pokémons`.', () => {
    // Passo 1 - Adiciona o elemento/componente
    render(
      <Router>
        <App />
      </Router>,
    );

    // Passo 3 - Faz o teste
    expect(screen.getByRole('heading', {
      name: 'Encountered pokémons',
      level: 2,
    })).toBeInTheDocument();
  });

  it('Teste se é exibido o próximo Pokémon da lista quando'
   + 'o botão `Próximo pokémon` é clicado', () => {
    // Passo 1 - Adiciona o elemento/componente
    render(
      <Router>
        <App />
      </Router>,
    );

    // Passo 2 - Interage com ele (caso seja necessário)
    userEvent.click(screen.getByText('Próximo pokémon'));

    // Passo 3 - Faz o teste
    expect(screen.getByTestId(ButtonNext)).toHaveTextContent('Próximo pokémon');
  });

  it('Os próximos Pokémons da lista devem ser mostrados,'
   + 'um a um, ao clicar sucessivamente no botão;', () => {
    render(
      <Router>
        <App />
      </Router>,
    );

    // Passo 2 - Interage com ele (caso seja necessário)
    userEvent.click(screen.getByTestId(ButtonNext));
    // Passo 3 - Faz o teste
    expect(screen.getByAltText('Charmander sprite'))
      .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png');

    // Passo 2 - Interage com ele (caso seja necessário)
    userEvent.click(screen.getByTestId(ButtonNext));
    // Passo 3 - Faz o teste
    expect(screen.getByAltText('Caterpie sprite'))
      .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/8/83/Spr_5b_010.png');

    // Passo 2 - Interage com ele (caso seja necessário)
    userEvent.click(screen.getByTestId(ButtonNext));
    // Passo 3 - Faz o teste
    expect(screen.getByAltText('Ekans sprite'))
      .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/1/18/Spr_5b_023.png');

    // Passo 2 - Interage com ele (caso seja necessário)
    userEvent.click(screen.getByTestId(ButtonNext));
    // Passo 3 - Faz o teste
    expect(screen.getByAltText('Alakazam sprite'))
      .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/8/88/Spr_5b_065_m.png');

    // Passo 2 - Interage com ele (caso seja necessário)
    userEvent.click(screen.getByTestId(ButtonNext));
    // Passo 3 - Faz o teste
    expect(screen.getByAltText('Mew sprite'))
      .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/4/43/Spr_5b_151.png');

    // Passo 2 - Interage com ele (caso seja necessário)
    userEvent.click(screen.getByTestId(ButtonNext));
    // Passo 3 - Faz o teste
    expect(screen.getByAltText('Rapidash sprite'))
      .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/5/58/Spr_5b_078.png');

    // Passo 2 - Interage com ele (caso seja necessário)
    userEvent.click(screen.getByTestId(ButtonNext));
    // Passo 3 - Faz o teste
    expect(screen.getByAltText('Snorlax sprite'))
      .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/4/40/Spr_5b_143.png');

    // Passo 2 - Interage com ele (caso seja necessário)
    userEvent.click(screen.getByTestId(ButtonNext));
    // Passo 3 - Faz o teste
    expect(screen.getByAltText('Dragonair sprite'))
      .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/2/2c/Spr_5b_148.png');

    // Passo 2 - Interage com ele (caso seja necessário)
    userEvent.click(screen.getByTestId(ButtonNext));
    // Passo 3 - Faz o teste
    expect(screen.getByAltText('Pikachu sprite'))
      .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('O primeiro Pokémon da lista deve ser mostrado ao'
   + 'clicar no botão, se estiver no último Pokémon da lista;', () => {
    render(
      <Router>
        <App />
      </Router>,
    );

    userEvent.click(screen.getByRole('button', { name: 'All' }));
    expect(screen.getByText(('Pikachu'))).toBeInTheDocument();
  });

  it('Teste se é mostrado apenas um Pokémon por vez.', () => {
    render(
      <Router>
        <App />
      </Router>,
    );

    userEvent.click(screen.getByTestId(ButtonNext));
    expect(screen.getByText(('Charmander'))).toBeInTheDocument();

    userEvent.click(screen.getByTestId(ButtonNext));
    expect(screen.getByText(('Caterpie'))).toBeInTheDocument();

    userEvent.click(screen.getByTestId(ButtonNext));
    expect(screen.getByText(('Ekans'))).toBeInTheDocument();

    userEvent.click(screen.getByTestId(ButtonNext));
    expect(screen.getByText(('Alakazam'))).toBeInTheDocument();

    userEvent.click(screen.getByTestId(ButtonNext));
    expect(screen.getByText(('Mew'))).toBeInTheDocument();

    userEvent.click(screen.getByTestId(ButtonNext));
    expect(screen.getByText(('Rapidash'))).toBeInTheDocument();

    userEvent.click(screen.getByTestId(ButtonNext));
    expect(screen.getByText(('Snorlax'))).toBeInTheDocument();

    userEvent.click(screen.getByTestId(ButtonNext));
    expect(screen.getByText(('Dragonair'))).toBeInTheDocument();

    userEvent.click(screen.getByTestId(ButtonNext));
    expect(screen.getByText(('Pikachu'))).toBeInTheDocument();
  });

  // it('Teste se a Pokédex tem os botões de filtro', () => {
  //   render(
  //     <Router>
  //       <App />
  //     </Router>,
  //   );
  // });
});
