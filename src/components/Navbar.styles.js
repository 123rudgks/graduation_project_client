import styled from "styled-components";

export const NavbarContainer = styled.nav`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 12px;
  height: 60px;
  box-shadow: 0px -3px 3px 0px #f0f0f0 inset;
  font-family: ${(props)=>props.theme.IM_Hyemin};
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
    background-color: #D0D3D4;
    border-radius: 5px;
    cursor: pointer;
  }
`;
