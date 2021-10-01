import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './utils/renderWithRouter';
import { About } from '../components';
// Uso do selector : https://trybecourse.slack.com/archives/C023LSXLGG7/p1633002970441800

describe('Elementos do componente <About.js />', () => {
  it('A página contém um heading h2 com o texto" About Pokédex".', () => {
    renderWithRouter(<About />);
    const textAbout = screen.getByRole('heading', { name: /about pokédex/i });
    expect(textAbout).toBeInTheDocument();
  });

  it('A página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<About />);
    const firstParagraph = screen.getByText(/this application simul/i, { selector: 'p' });
    const secondParagraph = screen.getByText(/one can filter pokém/i, { selector: 'p' });
    expect(firstParagraph).toBeInTheDocument();
    expect(secondParagraph).toBeInTheDocument();
  });

  it('A página contém a seguinte imagem de uma Pokédex', () => {
    renderWithRouter(<About />);
    const image = screen.getByRole('img', { name: /pokédex/i });
    expect(image.src).toBe('https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
  });
});
