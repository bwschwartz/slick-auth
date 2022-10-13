import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage'
import SignUpFormPage from './components/SignUpFormPage'
import NavBar from './components/NavBar'

function App() {
  return (
    <Switch>
      <Route path="/login">
        <LoginFormPage/>
      </Route>

      <Route path="/signup">
        <SignUpFormPage/>
      </Route>

      <Route path="/signup">
        <SignUpFormPage/>
      </Route>

      <Route path="/">
        <NavBar/>
      </Route>

    </Switch>
  );
}

export default App;
