// * : libraries
import React from 'react';
import PropTypes from 'prop-types';
// * : components
import { NavbarContainer, NavbarLogo, NavbarMenu } from './Navbar.styles';

function Navbar({ menus }) {
  return (
    <NavbarContainer>
      <NavbarLogo>[LOGO IMG]</NavbarLogo>
      <NavbarMenu>
        {menus.map((menu, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <li key={index}>{menu}</li>
        ))}
      </NavbarMenu>
    </NavbarContainer>
  );
}

Navbar.propTypes = {
  menus: PropTypes.node,
};
Navbar.defaultProps = {
  menus: [],
};
export default Navbar;
