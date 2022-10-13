import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage'
import SignUpFormPage from './components/SignUpFormPage'
import NavBar from './components/NavBar'
import { ChannelPage } from './components/ChannelPage'


function App() {
  return (
    <Switch>
      <Route path="/login">
        <LoginFormPage/>
      </Route>

      <Route path="/channels">
        <ChannelPage/>
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
