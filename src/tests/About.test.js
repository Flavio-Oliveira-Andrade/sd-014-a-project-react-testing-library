import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('Testes do componente <About />', () => {
  test('Testa se a página possui um h2, com o texto: About Pokédex', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    const linkAbout = screen.getByRole('link', {
      name: 'About',
    });

    userEvent.click(linkAbout);

    const aboutHeading = screen.getByRole('heading', {
      level: 2,
      name: 'About Pokédex',
    });
    expect(aboutHeading).toBeInTheDocument();
  });

  test('Testa se o texto da página do "About" aparece na tela', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    const linkAbout = screen.getByRole('link', {
      name: 'About',
    });

    userEvent.click(linkAbout);

    const textAbout = screen.getByText(/This application/);
    expect(textAbout).toBeInTheDocument();
  });

  test('Testa se o número de parágrafos na tela de About é igual a 2', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    const linkAbout = screen.getByRole('link', {
      name: 'About',
    });

    userEvent.click(linkAbout);

    const paragraph1 = screen.getByText(/This application/i, {
      selector: 'p',
    });
    const paragraph2 = screen.getByText(/One can filter/i, {
      selector: 'p',
    });

    const arrayParagraph = [paragraph1, paragraph2];
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
    expect(arrayParagraph.length).toBe(2);
  });

  test('Testa se a página do About contém a imagem correta', () => {
    render(<MemoryRouter><App /></MemoryRouter>);
    const linkAbout = screen.getByRole('link', {
      name: 'About',
    });

    userEvent.click(linkAbout);

    const image = screen.getByRole('img', {
      name: 'Pokédex',
    });
      //  test inspired by: https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
    expect(image).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb'
    + '/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
