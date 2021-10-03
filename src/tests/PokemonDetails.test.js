import React from 'react';
import { screen } from '@testing-library/react';
import fireEvent from '@testing-library/user-event';
import renderWithRouter from '../services/RenderWithRouter';
import App from '../App';

describe('Testa o componente <PokemonDetails.js/>', () => {
  test('Testa se as informações detalhadas do Pokémon são mostradas na tela', () => {
    renderWithRouter(<App />);
    const btn = screen.getByRole('link', { name: /more details/i });
    fireEvent.click(btn);
    const details = screen.getByRole('heading', { name: /pikachu details/i });
    expect(details).toBeInTheDocument();
    expect(btn).not.toBeInTheDocument();
    const sumary = screen.getByRole('heading', { level: 2, name: /summary/i });
    expect(sumary).toBeInTheDocument();
    const parag = screen.getByText(/this intelligent pokémon roasts hard/i);
    expect(parag).toBeInTheDocument();
  });
  test('Testa se há uma seção com os mapas com as localizações do pokémon', () => {
    renderWithRouter(<App />);
    const btn = screen.getByRole('link', { name: /more details/i });
    fireEvent.click(btn);
    const details = screen.getByRole('heading', { level: 2, name: /game locations of/i });
    expect(details).toBeInTheDocument();
    const local = screen.getAllByAltText(/location/i);
    expect(local).toHaveLength(2);
    expect(local[0].src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
    expect(local[0].alt).toBe('Pikachu location');
  });
  test('Testa se pode favoritar um pokémon através da página de detalhes.', () => {
    renderWithRouter(<App />);
    const btn = screen.getByRole('link', { name: /more details/i });
    fireEvent.click(btn);
    const fave = screen.getByText(/pokémon favoritado\?/i);
    expect(fave).toBeInTheDocument();
    fireEvent.click(fave);
    const faveYes = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(faveYes.alt).toBe('Pikachu is marked as favorite');
    fireEvent.click(fave);
    expect(faveYes).not.toBeInTheDocument();
  });
});
