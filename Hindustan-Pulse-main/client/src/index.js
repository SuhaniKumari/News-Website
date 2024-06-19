import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import rootReducer from './reducers/store';
import { configureStore } from '@reduxjs/toolkit';
import { Toaster } from 'react-hot-toast'
import './index.css';
import App from './App';

const store = configureStore({
    reducer: rootReducer,
})

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <BrowserRouter>
            <App />
            <Toaster/>
        </BrowserRouter>
    </Provider>
);
