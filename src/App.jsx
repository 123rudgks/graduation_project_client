// * : libraries
import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// * : components
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './components/GlobalStyles.styles';
// * : helpers
import { contexts } from './helpers/contexts';
// * : pages
import MapHome from './pages/MapHome/MapHome';
import Login from './pages/User/Login';
import Signin from './pages/User/Signin';

// * : css
import './font/font.css';

const theme = {
  mainColor: '#DCFCFC',
  grayBGColor: '#f7f9f9',
  defaultFont: 'IM_Hyemin',
};

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="signin" element={<Signin />} />
          <Route path="mapHome" element={<MapHome />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
