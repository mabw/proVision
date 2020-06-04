/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from "react";
import { Switch, Route } from "react-router-dom";

import DesignerPage from "containers/Designer/Loadable";
import DashboardPage from "containers/Dashboard/Loadable";
import NotFoundPage from "containers/NotFoundPage/Loadable";

import GlobalStyle from "../../global-styles";

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/editor/:id" component={DesignerPage} />
        <Route exact path="/" component={DashboardPage} />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </div>
  );
}
