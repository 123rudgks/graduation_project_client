import styled from "styled-components";

export const MapHomeRightTop = styled.div`
  display: flex;
  height: 110px;
  margin-bottom: 10px;
  flex-direction: column;
  justify-content: space-between;
`;
export const MapHomeRightTopBtn = styled.button`
  height: 30px;
  border-radius: 10px;
  background-color: ${(props) => (props.clicked ? "#DCFCFC" : "#FFFFFF")};
`;
export const MapHomeRightBottom = styled.div`
  height: calc(100% - 110px);
  overflow: auto;
`;
export const SearchPlace = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 30px;
`;
export const RecommendedPlace = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  & button {
    width: 45%;
  }
`;
export const PlaceCard = styled.div`
  box-sizing: border-box;
  position: relative;
  display: flex;
  width: 100%;
  height: 50px;
  margin: 10px 0;
  border: 1px solid;

  & img {
    width: 50px;
  }
  & div {
    flex: auto;
    padding: 3px;
  }
`;
