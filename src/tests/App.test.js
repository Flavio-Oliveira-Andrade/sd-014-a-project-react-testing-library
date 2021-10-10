import React from 'react';
import { render, screen } from "@testing-library/react";
import App from '../App';
import renderWithRouter from '../components/renderWithRouter';
import userEvent from '@testing-library/user-event';

it('should have links with texts: Home, About, Favorite Pokemons', () => {
    renderWithRouter(<App />);

    const links = screen.getAllByRole('link');

    expect(links[0]).toHaveTextContent('Home');
    expect(links[1]).toHaveTextContent('About');
    expect(links[2]).toHaveTextContent('Favorite Pokémons');
});

it('should redirect to "/" if Home is clicked', () => {
    const { history } = renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: 'Home' } );
    userEvent.click(link);
    
    const { pathname } = history.location;
    expect(pathname).toBe('/');
});

it('should redirect to "/About" if About is clicked', () => {
    const { history } = renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: 'About' } );
    userEvent.click(link);
    
    const { pathname } = history.location;
    expect(pathname).toBe('/about');
});

it('should redirect to "/favorites" if Favorite Pokémons is clicked', () => {
    const { history } = renderWithRouter(<App />);

    const link = screen.getByRole('link', { name: 'Favorite Pokémons' } );
    userEvent.click(link);
    
    const { pathname } = history.location;
    expect(pathname).toBe('/favorites');

});

it('should redirect to Not Found if non existent url is searched', () => {
    const { history } = renderWithRouter(<App />);

    history.push('/wingardiumLeviosa');
    
    const notFoundText = screen.findByText(/Page requested not found/i);
    expect(notFoundText).toBeDefined();
});