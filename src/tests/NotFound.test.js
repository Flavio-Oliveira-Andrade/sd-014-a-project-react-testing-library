import React from 'react';
import { render, screen } from "@testing-library/react";
import { FavoritePokemons } from '../components';
import renderWithRouter from '../components/renderWithRouter';
import userEvent from '@testing-library/user-event';
import App from '../App';

it('contains a h2 "Page requested not found', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/abajur');

    const notFoundText = screen.getByText(/Page requested not found/i);
    expect(notFoundText).toBeDefined();
});

it('shows the crying pikachu image', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/abajur');

    const url = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = screen.getByAltText(/Pikachu crying because/i);
    expect(image).toHaveAttribute('src', url);
});
