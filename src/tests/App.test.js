import React from 'react';
import renderWithRouter from './renderWithRouter.js';
import userEvent from '@testing-library/user-event';
import App from '../App.js';

describe('Test of App', () => {
	it('should have three links', () => {
		const { getByText } = renderWithRouter(<App />)
		const home = getByText(/home/i);
		const about = getByText(/about/i);
		const favorite = getByText(/favorite/i);

		expect(home).toBeInTheDocument();
		expect(about).toBeInTheDocument();
		expect(favorite).toBeInTheDocument();
	});

	it('should have in page home', () => {
		const { getByText, history } = renderWithRouter(<App />);
		userEvent.click(getByText(/home/i));
		const pathname = history.location.pathname;
		expect(pathname).toBe('/');
	});

	it('should have in page about', () => {
		const { getByText, history } = renderWithRouter(<App />);
		userEvent.click(getByText(/about/i));
		const pathname = history.location.pathname;
		expect(pathname).toBe('/about');
	});

	it('should have in page favorites', () => {
		const { getByText, history } = renderWithRouter(<App />);
		userEvent.click(getByText(/favorite/i));
		const pathname = history.location.pathname;
		expect(pathname).toBe('/favorites');
	});
	
	it('should have in page not Found', () => {
		const { getByText, history } = renderWithRouter(<App />);
		history.push('/page/notfound');
		const notFoundText = getByText(/not found/i);
		expect(notFoundText).toBeInTheDocument;
	})
});

