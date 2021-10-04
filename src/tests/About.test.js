import React from 'react';
import { render, screen } from '@testing-library/react';
import { createMemoryHistory } from 'history';
import { Router } from 'react-router';
import { fireEvent } from '@testing-library/dom';
import App from '../App';

describe('Teste o componente `<About.js />.`', () => {
  it('Teste se a página contém as informações sobre a Pokédex.', async () => {
    const history = createMemoryHistory();

    render(
      <Router history={ history }>
        <App />
      </Router>,
    );

    const linkAbout = screen.getByRole('link', { name: /About/i });

    fireEvent.click(linkAbout);

    const aboutPokedex = screen.getByRole('heading', {
      level: 2,
      name: /About Pokédex/i,
    });

    const img = screen.getByAltText(/Pokédex/i);

    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(img).toHaveAttribute('alt', 'Pokédex');
    expect(aboutPokedex).toBeInTheDocument();
  });
});
