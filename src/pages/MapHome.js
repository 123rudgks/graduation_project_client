// * : libraries
import React, { createContext, useState } from "react";
// * : helpers
import { contexts } from "../helpers/contexts";
// * : components
import {
  MapHomeDiv,
  MapHomeContainer,
  MapHomeRightContainer,
  MapHomeCenterContainer,
  MapHomeLeftContainer,
} from "../components/MapHomeContainer.styles";
import Navbar from "../components/Navbar";
import NaverMap from "../components/NaverMap";
import MapHomeRight from "./MapHomeRight";

function MapHome() {
  const [markers, setMarkers] = useState([]);
  return (
    <MapHomeDiv>
      <contexts.Provider value={{ markers, setMarkers }}>
        <Navbar menus={["Menu1", "Menu2", "Menu3"]} />
        <MapHomeContainer>
          <MapHomeLeftContainer>left</MapHomeLeftContainer>
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
