import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import App from '../App';

const MoreDetails = 'More details';

describe('6. Teste o componente `<Pokemon.js />`', () => {
  it('Teste se é renderizado um card com as informações de determinado pokémon.', () => {
    render(
      <Router>
        <App />
      </Router>,
    );

    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-name')).toBeInTheDocument();

    expect(screen.getByTestId('pokemon-type')).toBeInTheDocument();
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent('Electric');

    expect(screen.getByTestId(('pokemon-weight')
      .valueOf('Average weight: 6.0 kg'))).toBeInTheDocument();
  });

  it('- A imagem do Pokémon deve ser exibida. Ela deve'
    + 'conter um atributo `src` com a URL da imagem e um atributo'
    + '`alt` com o texto `<name> sprite`, onde `<name>` é o nome do pokémon;', () => {
    render(
      <Router>
        <App />
      </Router>,
    );
    expect(screen.getByAltText('Pikachu sprite'))
      .toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });

  it('Teste se o card do Pokémon indicado na Pokédex contém'
    + 'um link de navegação para exibir detalhes deste Pokémon.'
    + 'O link deve possuir a URL `/pokemons/<id>`, onde `<id>` é'
    + ' o id do Pokémon exibido;', () => {
    render(
      <Router>
        <App />
      </Router>,
    );

    expect(screen.getByRole('link', {
      name: 'More details',
    })).toHaveAttribute('href', '/pokemons/25');
  });

  it('Teste se ao clicar no link de navegação do Pokémon,'
    + 'é feito o redirecionamento da aplicação para a página de'
    + ' detalhes de Pokémon. ', () => {
    render(
      <Router>
        <App />
      </Router>,
    );

    userEvent.click(screen.getByRole('link', { name: MoreDetails }));
    expect(screen.getByText('Pikachu Details')).toBeInTheDocument();
  });

  // it.skip('Teste também se a URL exibida no navegador muda para'
  // + '`/pokemon/<id>`, onde `<id>` é o id do Pokémon cujos'
  // + 'detalhes se deseja ver;', () => {
  //   render(
  //     <Router>
  //       <Pokemon />
  //     </Router>,
  //   );

  //   userEvent.click(screen.getAllByText('More Details'));

  //   expect().toBe('/pokemons/25');
  // });

  it('Teste se existe um ícone de estrela nos Pokémons favoritados', () => {
    render(
      <Router>
        <App />
      </Router>,
    );

    userEvent.click(screen.getByLabelText('Pokémon favoritado?'));
    expect(screen.getByAltText('Pikachu is marked as favorite'))
      .toHaveAttribute('src', '/star-icon.svg');

    expect(screen.getByAltText('Pikachu is marked as favorite')).toBeInTheDocument();
  });
});
