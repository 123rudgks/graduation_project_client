import styled from "styled-components";

export const Header = styled.div`
  text-align: center;
  height: 110px;
  & div {
    height: 55px;
  }
`;
export const Contents = styled.div`
  flex: auto;
  overflow: auto;
`;
export const DayBox = styled.div``;
export const DayTitle = styled.div`
  font-size: ${(props) => (props.clicked ? "25px" : "20px")};
  color: ${(props) => (props.clicked ? "#FF8282" : "#000")};
  &:hover {
    cursor: pointer;
  }
`;
