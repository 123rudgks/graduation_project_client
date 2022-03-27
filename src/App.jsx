// * : libraries
import React, { useContext } from 'react';
// * : componentsß
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './components/GlobalStyles.styles';
// * : helpers
import { contexts } from './helpers/contexts';
// * : pages
import MapHome from './pages/MapHome/MapHome';
// * : css
import './font/font.css';

const theme = {
  mainColor: '#DCFCFC',
  grayBGColor: '#f7f9f9',
  defaultFont: 'IM_Hyemin',
};

function App() {
  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <GlobalStyles />
        <MapHome />
      </ThemeProvider>
    </div>
  );
}

export default App;
