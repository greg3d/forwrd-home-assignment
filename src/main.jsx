import React from 'react';
import ReactDOM from 'react-dom/client';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/700.css';
import App from './App.jsx';
import StoreProvider from './stores/StoreProvider.jsx';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(

    <StoreProvider>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </StoreProvider>
);
