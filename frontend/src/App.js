import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage'
import SignUpFormPage from './components/SignUpFormPage'

function App() {
  return (
    <Switch>
      <Route path="/login">
        <LoginFormPage/>
      </Route>
        <SignUpFormPage/>
      <Route path="/signup">
      </Route>
    </Switch>
  );
}

export default App;
