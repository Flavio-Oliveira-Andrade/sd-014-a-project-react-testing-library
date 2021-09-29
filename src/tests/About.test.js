import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import About from '../components/About';

describe('Requisito 2 - About.js', () => {
  test(
    'Checks if the page renders a "h2" tag with text describing the application',
    () => {
      render(
        <BrowserRouter>
          <About />
        </BrowserRouter>,
      );
      const blnHeadingAbout = screen.getByRole('heading', {
        name: /about pokédex/i,
        level: 2,
        exact: false,
      });
      expect(blnHeadingAbout).toBeInTheDocument();
    },
  );

  test(
    'Checks if two paragrapths are rendered with text describing the application',
    () => {
      render(
        <BrowserRouter>
          <About />
        </BrowserRouter>,
      );
      const firstParagraph = screen.getByText('This application simulates', {
        exact: false,
      });
      expect(firstParagraph).toBeInTheDocument();

      const secParagraph = screen.getByText('One can filter', {
        exact: false,
      });
      expect(secParagraph).toBeInTheDocument();
    },
  );

  test(
    'Checks if the Pokedex image is rendered and if its path is the correct one ',
    () => {
      render(
        <BrowserRouter>
          <About />
        </BrowserRouter>,
      );
      const imagePath = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
      const TestImage = screen.getByRole('img');
      expect(TestImage).toHaveAttribute('src', imagePath);
    // metodo de image test do site: https://dev.to/raphaelchaula/a-simple-image-test-in-react-3p6f
    },
  );
});
