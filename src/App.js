// * : libraries
import React, {useContext} from 'react';
// * : helpers
import {contexts} from "./helpers/contexts"
// * : components
import {GlobalStyles} from "./components/GlobalStyles.styles"
// * : pages
import MapHome from "./pages/MapHome";

function App() {
  return (
    <div className="App">
     <GlobalStyles/>
     <MapHome/>
    </div>
  );
}

export default App;
