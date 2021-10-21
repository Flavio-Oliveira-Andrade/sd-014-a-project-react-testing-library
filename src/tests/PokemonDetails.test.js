import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helper/renderWithRouter';
import App from '../App';

describe('Teste o componente <PokemonDetails.js />', () => {
  test('Teste se as informações detalhadas do Pokémon selecionado são mostradas na tela.',
    () => {
      renderWithRouter(<App />);
      userEvent.click(screen.getByRole('link', { name: /More Details/i }));
      const nameDetails = screen.getByRole('heading', { name: /Pikachu Detail/i });
      expect(nameDetails).toBeInTheDocument();
    });
  test(
    'Teste se existe na página uma seção com os mapas contendo as localizações',
    () => {
      renderWithRouter(<App />);
      userEvent.click(screen.getByRole('link', { name: /More Details/i }));
      const imagesMapas = screen.getAllByAltText('Pikachu location')[0];
      expect(imagesMapas.src).toBe('https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png');
      expect(imagesMapas.alt).toBe('Pikachu location');
    },
  );
  test('Teste se existe um heading com o Text Game Locations e Summary', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /More Details/i }));
    const headingSumary = screen.getByRole('heading', { name: /Summary/i });
    const paragraphSummary = screen.getByText(/This intelligent Pokémon/i);
    const headingLocation = screen.getByRole('heading', { name: /Game Locations/i });
    expect(headingLocation).toHaveTextContent('Game Locations of Pikachu');
    expect(headingSumary).toHaveTextContent('Summary');
    expect(paragraphSummary).toBeInTheDocument();
  });
  test('Teste se existe um Input de Favorite Pokemon', () => {
    renderWithRouter(<App />);
    userEvent.click(screen.getByRole('link', { name: /More Details/i }));
    const favorite = screen.getByRole('checkbox', { name: /Pokémon favoritado?/i });
    expect(favorite).toBeInTheDocument();
  });
});
