// * : libraries
import React from "react";
// * : components
import { NavbarContainer, NavbarLogo, NavbarMenu } from "./Navbar.styles";

function Navbar({ menus }) {
  return (
    <NavbarContainer>
      <NavbarLogo>[LOGO IMG]</NavbarLogo>
      <NavbarMenu>
        {menus.map((menu,index) => (
          <li key={index}>{menu}</li>
        ))}
      </NavbarMenu>
    </NavbarContainer>
  );
}

export default Navbar;
