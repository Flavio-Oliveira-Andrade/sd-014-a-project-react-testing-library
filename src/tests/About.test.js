import React from 'react';
import { render, screen } from '@testing-library/react';
import About from '../components/About';

describe('verifica se contem as informações sobre a Pokédex', () => {
  it('verifica se o title da pagina tem o texto About Pokédex', () => {
    render(<About />);
    const title = screen.getByRole('heading', { level: 2 });
    expect(title).toBeInTheDocument();

    expect(title).toHaveTextContent(/^About Pokédex$/i);
  });
  it('verifica se a pagina about contem 2 paragrafos, com texto sobre a pokedex', () => {
    render(<About />);
    const paragraphs = screen.getAllByText(/Pokémons/i);
    paragraphs.map((paragraph) => expect(paragraph).toBeInTheDocument());
    expect(paragraphs).toHaveLength(2);
  });
  it('verifica se renderiza a imagem correta', () => {
    render(<About />);
    const img = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const imgElement = screen.getByRole('img');
    expect(imgElement).toBeInTheDocument();

    expect(imgElement.src).toBe(img);
  });
});
