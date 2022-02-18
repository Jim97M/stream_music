import React from 'react';
import {CookieProvider} from 'react-cookie';
import ReactDOM from 'react-dom';
import App from "./components/App";
import { BrowserRouter } from 'react-router-dom';

const rootElement = document.getElementById("root");

ReactDOM.render(
    <CookieProvider>
        <App />
    </CookieProvider>,
    rootElement
);

