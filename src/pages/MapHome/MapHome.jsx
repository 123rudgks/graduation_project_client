// * : libraries
import React, { useState, useMemo } from 'react';
// * : helpers
import { contexts } from '../../helpers/contexts';
// * : components
import {
  MapHomeDiv,
  MapHomeContainer,
  MapHomeRightContainer,
  MapHomeCenterContainer,
  MapHomeLeftContainer,
} from '../../components/MapHomeStyles/MapHomeContainer.styles';
import Navbar from '../../components/Navbar';
import NaverMap from './NaverMap';
import MapHomeRight from './MapHomeRight';
import MapHomeLeft from './MapHomeLeft';

function MapHome() {
  // 지도위에 찍혀 있는 마커들 배열
  const [markers, setMarkers] = useState([]);
  // 날짜 클릭시 해당하는 날짜 정보
  const [clickedDay, setClickedDay] = useState({ day: 0, places: [], img: '' });

  return (
    <MapHomeDiv>
      <contexts.Provider
        // eslint-disable-next-line react/jsx-no-constructed-context-values
        value={{
          markers,
          setMarkers,
          clickedDay,
          setClickedDay,
        }}
      >
        <Navbar menus={['Menu1', 'Menu2', 'Menu3']} />

        <MapHomeContainer>
          <MapHomeLeftContainer>
            <MapHomeLeft />
          </MapHomeLeftContainer>
          <MapHomeCenterContainer>
            <NaverMap __placesAll={[]} />
          </MapHomeCenterContainer>
          <MapHomeRightContainer>
            <MapHomeRight />
          </MapHomeRightContainer>
        </MapHomeContainer>
      </contexts.Provider>
    </MapHomeDiv>
  );
}

export default MapHome;
