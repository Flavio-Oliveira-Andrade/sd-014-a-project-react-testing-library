import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

describe('Pokemon.js test', () => {
  const moreDetails = 'More details';
  it('Testa se é renderizado um card com as informações de determinado pokémon.', () => {
    renderWithRouter(<App />);
    const pokeName = screen.getByTestId('pokemon-name');
    const pokeType = screen.getByTestId('pokemon-type');
    const pokeWeight = screen.getByTestId('pokemon-weight');
    const pokeImg = screen.getByAltText('Pikachu sprite');

    expect(pokeName.innerHTML).toBe('Pikachu');
    expect(pokeType.innerHTML).toBe('Electric');
    expect(pokeWeight.innerHTML).toBe('Average weight: 6.0 kg');
    expect(pokeImg).toHaveAttribute('src',
      'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
  });
  it('se o card do Pokémon indicado na Pokédex'
  + ' contém um link de navegação para exibir detalhes deste Pokémon. ',
  () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: moreDetails });
    expect(linkMoreDetails).toHaveAttribute('href', '/pokemons/25');
  });
  it('Testa se ao clicar no link de navegação do Pokémon,'
  + ' é feito o redirecionamento da aplicação para a página de detalhes de Pokémon.',
  () => {
    renderWithRouter(<App />);
    const linkDetails = screen.getByText(moreDetails);
    userEvent.click(linkDetails);
    const textPikachuDetails = screen.getByRole('heading', { name: 'Pikachu Details' });
    expect(textPikachuDetails).toBeInTheDocument();
  });
  it('também se a URL exibida no navegador muda para /pokemon/<id>,'
  + ' onde <id> é o id do Pokémon cujos detalhes se deseja ver;',
  () => {
    const { history } = renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: moreDetails });
    userEvent.click(linkMoreDetails);
    const { pathname } = history.location;
    expect(pathname).toBe('/pokemons/25');
  });
  it('Testa e existe um ícone de estrela nos Pokémons favoritados.', () => {
    renderWithRouter(<App />);
    const linkMoreDetails = screen.getByRole('link', { name: moreDetails });
    userEvent.click(linkMoreDetails);
    const checkFavo = screen.getByRole('checkbox');
    userEvent.click(checkFavo);
    const imgIcon = screen.getByAltText('Pikachu is marked as favorite');
    expect(imgIcon).toHaveAttribute('src', '/star-icon.svg');
  });
});
