import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

// Requisito 2
test('testa se a página contém um heading h2 com o texto About Pokédex', () => {
  render(<About />);

  const textAboutPokedex = screen.getByRole('heading', {
    level: 2,
    name: 'About Pokédex',
  });
  expect(textAboutPokedex).toBeInTheDocument();
});

// Requisito 2
test('testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
  render(<About />);

  const textParagraphOne = screen.getByText('This application simulates a Pokédex, '
  + 'a digital encyclopedia containing all Pokémons');
  expect(textParagraphOne).toBeInTheDocument();

  const textParagraphTwo = screen.getByText('One can filter Pokémons by type, '
  + 'and see more details for each one of them');
  expect(textParagraphTwo).toBeInTheDocument();
});

// Requisito 2
// Referência: https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
test('testa se a página contém um src específico em uma imagem', () => {
  render(<About />);

  const imgPokedex = screen.getByRole('img');
  expect(imgPokedex).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
});
