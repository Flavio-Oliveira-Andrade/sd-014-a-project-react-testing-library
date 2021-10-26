import React from 'react';
import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from '../renderWithRouter';
import App from '../App';

const pikachu = '/pokemons/25';
const altImage = 'Pikachu location';

it('deve aparecer info detalhadas dos Pokémons selecionados na tela', () => {
  const { history } = renderWithRouter(<App />);

  const link = screen.getByRole('link', { name: 'More details' });

  history.push(pikachu);

  const details = screen.getByRole('heading', { level: 2, name: 'Pikachu Details' });
  expect(details).toBeInTheDocument();

  expect(link).not.toBeInTheDocument();

  const h2 = screen.getByRole('heading', { level: 2, name: 'Summary' });
  expect(h2).toBeInTheDocument();

  const paragraph = 'This intelligent Pokémon roasts hard'
                + ' berries with electricity to make them tender enough to eat.';
  const summary = screen.getByText(paragraph);
  expect(summary).toBeInTheDocument();
});

it('deve conter uma seção na página com mapas', () => {
  const { history } = renderWithRouter(<App />);
  history.push(pikachu);

  const h2 = screen.getByRole('heading', {
    level: 2, name: 'Game Locations of Pikachu',
  });
  expect(h2).toBeInTheDocument();

  const localizLeng = screen.getAllByAltText(altImage);
  expect(localizLeng).toHaveLength(2);

  const local1 = screen.getByText('Kanto Viridian Forest' || 'Kanto Power Plant');
  expect(local1).toBeInTheDocument();

  const url1 = 'https://cdn2.bulbagarden.net/upload/0/08/Kanto_Route_2_Map.png';
  const url2 = 'https://cdn2.bulbagarden.net/upload/b/bd/Kanto_Celadon_City_Map.png';

  const imagesLocation = screen.getAllByRole('img', { name: altImage });
  expect(imagesLocation).toHaveLength(2);
  imagesLocation.every((images) => expect(images.src).toBe(url1 || url2));
  imagesLocation.every((images) => expect(images.alt).toBe(altImage));
});

it('verifica se o usuario pode adicionar um Pokémon como favorito', () => {
  const { history } = renderWithRouter(<App />);
  history.push(pikachu);

  const label = screen.getByLabelText('Pokémon favoritado?');

  expect(label).toBeInTheDocument();

  fireEvent.click(label);
  expect(label).toBeChecked();
  fireEvent.click(label);
  expect(label).not.toBeChecked();
});
