import { render, screen } from '@testing-library/react';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import About from '../components/About';

describe('testa o componente About.js', () => {
  // test('testa se a página contém as informações sobre a Pokédex.', () => {
  //   render(<About />, { wrapper: BrowserRouter });

  //   const image = screen.getByRole('img', { name:  });
  //   expect(image).toBeInTheDocument();
  // });

  test('testa se a página contém um heading h2 com o texto About Pokédex', () => {
    render(<About />, { wrapper: BrowserRouter });

    const heading = screen.getByRole('heading', { name: /About pokédex/i, level: 2 });

    expect(heading).toBeInTheDocument();
  });

  test('testa se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    render(<About />, { wrapper: BrowserRouter });

    const paragraphs = screen.getAllByText(/Pokémon/i, { selector: 'p' });
    expect(paragraphs.length).toBe(2);
  });

  test('testa se a página contém a respectiva imagem de uma Pokédex', () => {
    render(<About />, { wrapper: BrowserRouter });

    const image = screen.getByRole('img', { name: 'Pokédex' });
    expect(image).toBeInTheDocument();
  });
});

// Requisito dos parágrafos realizado com a ajuda dos colegas no Slack(https://trybecourse.slack.com/archives/C023LSXLGG7/p1633002970441800)
