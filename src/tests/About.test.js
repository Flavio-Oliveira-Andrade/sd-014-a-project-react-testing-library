import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import About from '../components/About';

const renderAboutPage = () => render(
  <Router history={ createMemoryHistory() }>
    <About />
  </Router>,
);

test('Teste se a página contém as informações sobre a Pokédex.', () => {
  renderAboutPage();
  const primeiroParagrafo = screen.getByText(/This application simulates a Pokédex/i);
  const segundParagrafo = screen.getByText(/One can filter Pokémons by type/i);
  expect(primeiroParagrafo).toBeInTheDocument();
  expect(segundParagrafo).toBeInTheDocument();
});
test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => {
  renderAboutPage();
  expect(screen.getByRole('heading', {
    level: 2,
    name: /About Pokédex/i,
  })).toBeInTheDocument();
});
test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => {
  renderAboutPage();
  const paragrafos = screen.getAllByText(/Pokémons/i);
  expect(paragrafos).toHaveLength(2);
});
test('Teste se a página contém a seguinte imagem de uma Pokédex:'
+ ' https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png.', () => {
  renderAboutPage();
  const URL = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
  const imagem = screen.getByRole('img');
  expect(imagem).toBeInTheDocument();
  expect(imagem).toHaveAttribute('src', URL);
});
