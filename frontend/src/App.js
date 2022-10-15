import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage'
import SignUpFormPage from './components/SignUpFormPage'
import NavBar from './components/NavBar'
import { ChannelPage } from './components/ChannelPage'
import { ChannelCreationForm } from './components/ChannelCreationForm'


function App() {
  return (
    <Switch>
      <Route path="/login">
        <LoginFormPage/>
      </Route>

      <Route exact path="/channels">
        <ChannelPage/>
        <ChannelCreationForm/>
      </Route>

      <Route exact path="/signup">
        <SignUpFormPage/>
      </Route>

      <Route path="/">
        <NavBar/>
      <ChannelPage/>

      </Route>

    </Switch>
  );
}

export default App;
