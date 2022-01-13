import React from 'react';
import {CookieProvider} from 'react-cookie';
import ReactDOM from 'react-dom';
import App from "./components/App";

const rootElement = document.getElementById("root");

ReactDOM.render(
    <CookieProvider>
        <App />
    </CookieProvider>,
    rootElement
);