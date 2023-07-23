import React from 'react';
import ReactDOM from 'react-dom';
import './app.module.scss';
// import { Provider } from 'react-redux';
// import store from './store'; 
import App from './App';

import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
    <BrowserRouter>
        {/* <Provider store={store}> */}
            <React.StrictMode>
                <App />
            </React.StrictMode>
        {/* </Provider> */}
    </BrowserRouter>,
    document.getElementById('root'),
);
