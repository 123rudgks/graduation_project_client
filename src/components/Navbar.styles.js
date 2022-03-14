import styled from "styled-components";

export const NavbarContainer = styled.nav`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  height: 50px;
  background-color: #263343;
`;
export const NavbarLogo = styled.div`
  font-size: 24px;
  color: cadetblue;
`;

export const NavbarMenu = styled.ul`
  display: flex;
  list-style: none;
  padding-left: 0px;
  & li {
    padding: 10px 20px;
  }
  & li:hover {
    background-color: rgb(87, 170, 166);
    border-radius: 5px;
    cursor: pointer;
  }
`;
