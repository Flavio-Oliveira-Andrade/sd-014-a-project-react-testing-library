import React from "react";
import { render } from "@testing-library/react";
import { createMemoryHistory } from 'history';
import { Router } from "react-router";


const historyRouter = (component) => {
  const history = createMemoryHistory();
  return (
    {
      ... render(<Router history={ history }>{ component }</Router>),
      history,
    }
    );
}

export default historyRouter;