//This is for calling App.jsx and run our application
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    {/* wrap app inside the provider and pass store as the redux store which we created*/}
    {/* we have done redux toolkit setup */}
    {/* with the help of Providerwe inject store in our applicetion */}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

