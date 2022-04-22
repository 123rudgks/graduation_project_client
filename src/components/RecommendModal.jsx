import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 12px;
  width: 60%;
  height: 70vh;
  background-color: white;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  overflow: auto;
`;
const PlaceCard = styled.div`
padding: 10px;
  display: flex;
  img{
    width: 200px;
  }
  & .cardInfo {
    padding:10px;
    display: flex;
    flex-direction: column;
    button{
      width: 50px;
    }
  }
`;
/*
addr1": "제주특별자치도 제주시 산록북로 819",
                        "addr2": "(아라일동)",
                        "areacode": 39,
                        "cat1": "B02",
                        "cat2": "B0201",
                        "cat3": "B02010700",
                        "contentid": 2486105,
                        "contenttypeid": 32,
                        "createdtime": 20170320165505,
                        "firstimage": "http://tong.visitkorea.or.kr/cms/resource/96/2486096_image2_1.JPG",
                        "firstimage2": "http://tong.visitkorea.or.kr/cms/resource/96/2486096_image2_1.JPG",
                        "mapx": 126.5544690871,
                        "mapy": 33.4375488373,
                        "mlevel": 6,
                        "modifiedtime": 20211231111726,
                        "readcount": 1964,
                        "sigungucode": 4,
                        "tel": "064-724-9931",
                        "title": "관음사가는길펜션"
*/
function RecommendModal({ setOpenModal, addMarkerOnMap }) {
  const tempArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <ModalContainer>
      <button onClick={() => setOpenModal(false)}>cancel</button>
      {tempArr.map((i) => (
        <PlaceCard key={i}>
          <img src="http://tong.visitkorea.or.kr/cms/resource/96/2486096_image2_1.JPG"></img>
          <div className='cardInfo'>
            <div>title: 관음사가는길펜션</div>
            <div>addr1: 제주특별자치도 제주시 산록북로 819</div>
            <div>tel: 064-724-9931</div>
            <button onClick={()=>{addMarkerOnMap({
              tag: 'search',
              name: '관음사가는길펜션',
              lat: 33.4375488373,
              lng: 126.5544690871,
              onMap: false,
            })}}>add</button>
          </div>
        </PlaceCard>
        
      ))}
    </ModalContainer>
  );
}

RecommendModal.propTypes = {
  setOpenModal: PropTypes.func,
  addMarkerOnMap: PropTypes.func,
  
};
export default RecommendModal;
