import React from 'react';
import {
  screen,
} from '@testing-library/react';

import App from '../App';
import renderWithRouter from './utils/renderWithRouter';

test('se a página contém as informações sobre a Pokédex.', () => {
  const { history } = renderWithRouter(<App />);

  history.push('/about');

  const aboutPokedexText = screen.getByRole('heading', {
    level: 1,
    name: /Pokédex/i,
  });
  expect(aboutPokedexText).toBeInTheDocument();
});

test('se a página contém um heading h2 com o texto "About Pokédex"', () => {
  const { history } = renderWithRouter(<App />);

  history.push('/about');

  const aboutPokedexText = screen.getByRole('heading', {
    level: 2,
    name: /About Pokédex/i,
  });
  expect(aboutPokedexText).toBeInTheDocument();
});

test('se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
  const { history } = renderWithRouter(<App />);

  history.push('/about');

  const paragraphPokedex1 = screen.getByText(/This application simulates a Pokédex/i);
  expect(paragraphPokedex1).toBeInTheDocument();

  const paragraphPokedex2 = screen.getByText(/One can filter Pokémons by type/i);
  expect(paragraphPokedex2).toBeInTheDocument();
});

test('se a página contém a imagem de uma Pokédex.', () => {
  const { history } = renderWithRouter(<App />);

  history.push('/about');

  const imgPokedex = screen.getByRole('img');
  expect(imgPokedex).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
