import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './css/index.css';
import { ThroughProvider } from 'react-through';

// using for reactstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';

ReactDOM.render(
  <ThroughProvider>
    <App />
  </ThroughProvider>,
  document.getElementById('root')
);
