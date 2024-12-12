import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { ThemeProvider } from '@mui/material/styles';
import theme from './theme'; // Import your MUI theme file
import { App } from './app/App';
import './styles.scss';
import { swrConfig } from './swrConfig';
import { SWRConfig } from 'swr';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
    <BrowserRouter>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <SWRConfig value={swrConfig}>
                    <App />
                </SWRConfig>
            </ThemeProvider>
        </Provider>
    </BrowserRouter>
);
