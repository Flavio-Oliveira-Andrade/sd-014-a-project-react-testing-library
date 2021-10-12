import React from 'react';
import { fireEvent, screen } from '@testing-library/react';
import App from '../App';
import renderWithRouter from './utils/renderWithRouter';
import pokemons from '../data';

const moreDetails = 'More details'; 

describe('Testes do componente <PokemonDetails />', () => {
  test('Se as informações detalhadas do Pokémon'
  + ' selecionado são mostradas na tela.', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText(moreDetails));
    expect(screen.getByText(`${pokemons[0].name} Details`)).toBeInTheDocument();
    // usei queryByText para trazer o elemento ou mostrar null e não dar erro
    // https://github.com/testing-library/jest-dom/issues/202
    expect(screen.queryByText(moreDetails)).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Summary', level: 2 }))
      .toBeInTheDocument();
    expect(screen.getByText(/This intelligent Pokémon/)).toBeInTheDocument();
  });

  test('Se existe na página uma seção com os mapas'
  + ' contendo as localizações do pokémon', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText(moreDetails));
    const imgList = screen.getAllByAltText(`${pokemons[0].name} location`);
    expect(screen.getByRole('heading',
      { name: `Game Locations of ${pokemons[0].name}`, level: 2 }))
      .toBeInTheDocument();
    pokemons[0].foundAt.forEach((location, index) => {
      expect(screen.getByText(location.location)).toBeInTheDocument();
      expect(imgList[index]).toHaveAttribute('src', location.map);
    });
  });

  test('Se o usuário pode favoritar um pokémon através da página de detalhes.', () => {
    renderWithRouter(<App />);
    fireEvent.click(screen.getByText(moreDetails));
    const checkboxFavorite = screen.getByRole('checkbox',
      { name: 'Pokémon favoritado?' });
    expect(checkboxFavorite).toBeInTheDocument();
    fireEvent.click(checkboxFavorite);
    expect(screen.getByAltText(`${pokemons[0].name} is marked as favorite`))
      .toBeInTheDocument();
    expect(checkboxFavorite).toBeChecked();
    fireEvent.click(checkboxFavorite);
    expect(screen.queryByAltText(`${pokemons[0].name} is marked as favorite`))
      .not.toBeInTheDocument();
    expect(checkboxFavorite).not.toBeChecked();
  });
});
