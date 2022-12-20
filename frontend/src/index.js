import React, { createContext, useState } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import configureStore from './store';
import csrfFetch from './store/csrf'
import * as sessionActions from './store/session'
import { fetchChannels } from './store/channels'
import { ModalProvider } from './context/Modal'
import ChatContext from './context/ChatContext'
import ActionCable from 'actioncable';
import './index.css';

// const ChatApp = actionCable.createConsumer('ws://localhost:3000/cable')

const store = configureStore();


if (process.env.NODE_ENV !== 'production') {
  window.store = store;
  window.csrfFetch = csrfFetch;
  window.sessionActions = sessionActions;
  window.fetchChannels = fetchChannels;
}

const renderApplication = () => {
  ReactDOM.render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    document.getElementById('root')
  );
}

// chat stuff, need to move elsewher-
const consumer = ActionCable.createConsumer('ws://localhost:3000/cable');




//should move to its own context



function Root() {
  const [showProfileEdit, setShowProfileEdit] = useState([20, 80, 0])
  const [channelDisplayName, setChannelDisplayName] = useState(false)


  return (
    <ModalProvider>
      <Provider store={store}>
        <ChatContext.Provider value={{ consumer, showProfileEdit,  setShowProfileEdit, channelDisplayName, setChannelDisplayName }}>
          <BrowserRouter>
            <App/>
          </BrowserRouter>
        </ChatContext.Provider>
      </Provider>
    </ModalProvider>
  );
}

if (sessionStorage.getItem("user") !== null ||
  sessionStorage.getItem("X-CSRF-Token") === null) {
  store.dispatch(sessionActions.restoreSession()).then(renderApplication);
} else {
  renderApplication();
}


// ReactDOM.render(
//   <React.StrictMode>
//     <Root />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
