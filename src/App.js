import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import Login from './components/Login';
import WarrantyEditor from './components/WarrantyEditor';
import WarrantyList from './components/WarrantyList';
import Navigation from './components/Navigation';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
    },
    secondary: {
      main: '#f50057',
    },
  },
});

function App() {
  const isAuthenticated = !!localStorage.getItem('token');

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {isAuthenticated && <Navigation />}
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/editor"
            element={isAuthenticated ? <WarrantyEditor /> : <Navigate to="/login" />}
          />
          <Route
            path="/warranties"
            element={isAuthenticated ? <WarrantyList /> : <Navigate to="/login" />}
          />
          <Route
            path="/"
            element={<Navigate to={isAuthenticated ? "/warranties" : "/login"} />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;