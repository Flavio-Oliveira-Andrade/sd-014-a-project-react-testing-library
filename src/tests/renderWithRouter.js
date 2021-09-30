import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// veja https://testing-library.com/docs/example-react-router/#reducing-boilerplate
const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(ui, { wrapper: BrowserRouter });
};

export default renderWithRouter;
