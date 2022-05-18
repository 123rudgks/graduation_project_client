// * : libraries
import React, { useContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// * : components
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './components/GlobalStyles.styles';
// * : helpers
import { contexts, tripInfoContext } from './helpers/contexts';
import { AuthContext } from './helpers/AuthContext';

// * : pages
import Home from './pages/Home/Home';
import MapHome from './pages/MapHome/MapHome';
import Login from './pages/User/Login';
import SignUp from './pages/User/SignUp';
import MyPage from './pages/User/MyPage';

// * : css
import './font/font.css';

const theme = {
  mainColor: '#DCFCFC',
  grayBGColor: '#f7f9f9',
  defaultFont: 'IM_Hyemin',
};

function App() {
  const [authState, setAuthState] = useState({
    username: '',
    email: '',
    status: false,
  });
  const [tripInfo, setTripInfo] = useState({
    area: '',
    areaLoc: [],
    startDate: '',
    endDate: '',
  });

  // !: accessToken으로 로그인 유지하기
  // useEffect(async ()=>{
  //   let basicInfo;
  //   try {
  //     basicInfo = await axios.get(
  //       `http://localhost:3001/users/basicInfo/${username}`,
  //     );
  //     console.log(basicInfo);
  //     setAuthState({
  //       username: basicInfo.data.username,
  //       email: basicInfo.data.email,
  //       status: true,
  //     });
  //   } catch (e) {
  //     console.log(e);
  //   }
  // },[])
  return (
    <BrowserRouter>
      <AuthContext.Provider value={{ authState, setAuthState,tripInfo, setTripInfo }}>
          <ThemeProvider theme={theme}>
            <GlobalStyles />
            <Routes>
              <Route index element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="mapHome" element={<MapHome />} />
              <Route path="mapHome/:username" element={<MapHome />} />
              <Route path="MyPage" element={<MyPage />} />
              <Route path="MyPage/:username" element={<MyPage />} />
              <Route path="MyPage/:username/:id" element={<MyPage />} />
            </Routes>
          </ThemeProvider>
      </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
