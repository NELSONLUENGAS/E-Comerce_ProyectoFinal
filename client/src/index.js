import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from "react-redux";
import { store } from "./store";
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(

  <Provider store={store}>
    <React.Fragment>
      <Auth0Provider domain="dev-97mfdrxp.us.auth0.com" clientId="gbSCy8uFsWQEtEYoK364LIQ6zZCsaWMg" redirectUri={window.location.origin}>
        <App />
      </Auth0Provider>
      </React.Fragment>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();