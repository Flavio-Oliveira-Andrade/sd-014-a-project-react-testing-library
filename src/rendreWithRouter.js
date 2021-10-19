import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

// retirado de https://testing-library.com/docs/example-react-router/#reducing-boilerplate
const renderWithRouter = (ui, { route = '/'} = {}) => {
  window.history.pushState({}, 'test page', route);
  return render(ui, {wrapper: BrowserRouter});
}

export default renderWithRouter;
