import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App';

describe('Teste o componente `<Pokemon.js />`', () => {
  test('Teste se é renderizado um card com as informações de determinado pokémon', () => {
    render(
      <Router>
        <App />
      </Router>,
    );
    expect(screen.getByTestId('pokemon-name')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-type')).toBeInTheDocument();
  });

  test('A imagem do Pokémon deve ser exibida.'
  + 'Ela deve conter um atributo `src` com a URL da imagem'
  + 'e um atributo `alt` com o texto `<name> sprite`,'
  + 'onde `<name>` é o nome do pokémon;', () => {
    render(
      <Router>
        <App />
      </Router>,
    );

    expect(screen.getByAltText('Pikachu sprite')).toBeInTheDocument();
  });

  test('Teste se o card do Pokémon indicado na Pokédex contém um link'
  + 'de navegação para exibir detalhes deste Pokémon.'
  + 'O link deve possuir a URL `/pokemons/<id>`,'
  + 'onde `<id>` é o id do Pokémon exibido;', () => {
    render(
      <Router>
        <App />
      </Router>,
    );

    expect(screen.getByRole('link',
      { name: 'More details' })).toBeInTheDocument();
  });

  test('Teste se ao clicar no link de navegação do Pokémon,'
  + 'é feito o redirecionamento da aplicação para a'
  + 'página de detalhes de Pokémon.', () => {
    render(
      <Router>
        <App />
      </Router>,
    );

    userEvent.click(screen.getByRole('link', { name: 'More details' }));
    expect(screen.getByText('Pikachu Details')).toBeInTheDocument();
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    render(
      <Router>
        <App />
      </Router>,
    );

    userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
    expect(screen.getByAltText('Pikachu is marked as favorite'))
      .toHaveAttribute('src', '/star-icon.svg');
  });
});
