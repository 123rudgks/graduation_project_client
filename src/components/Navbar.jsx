// * : libraries
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
// * : components
// import { NavbarContainer, NavbarLogo, NavbarMenu } from './Navbar.styles';

// * : styles
const NavbarContainer = styled.nav`
width: 100vw;
  background-color: white;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  height: 60px;
  box-shadow: 0px -3px 3px 0px #f0f0f0 inset;
  font-family: ${(props) => props.theme.defaultFont};
`;
const NavbarLogo = styled.div`
  font-size: 24px;
  color: cadetblue;
`;
const NavbarMenu = styled.ul`
  display: flex;
  list-style: none;
  padding-left: 0px;
`;
const MenuItem = styled(NavLink)`
  padding: 10px 10px;
  text-decoration: none;
  white-space: pre;
  color: black;
  &:hover {
    background-color: ${(props)=>props.theme.mainColor};
    border-radius: 5px;
    cursor: pointer;
  }
  &.active {
    border-bottom: 2px solid ${(props) => props.theme.mainColor};
    &:hover {
      color: ${(props) => props.theme.mainColor};
    }
  }
  & + & {
    margin-left: 1rem;
  }
`;

function Navbar({ menus }) {
  return (
    <NavbarContainer>
      <NavbarLogo>[LOGO IMG]</NavbarLogo>
      <NavbarMenu>
        {menus.map((menu) => (
          <MenuItem
            key={menu}
            className={({ isActive }) =>
              `nav-link ${isActive ? 'activated' : ''}`
            }
            // end={menu.name === 'all'}
            to={menu === 'all' ? '/' : `/${menu}`}
          >
            {menu}
          </MenuItem>
          // eslint-disable-next-line react/no-array-index-key
          // <li key={index}>{menu}</li>
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
