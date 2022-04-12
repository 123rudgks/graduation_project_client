import React, {
  useEffect,
  useContext,
  useCallback,
  useState,
  useRef,
} from 'react';
import styled from 'styled-components';
// * : helpers
import { contexts } from '../../helpers/contexts';

const MileStone = `
<div style=
"display:inline-block;
padding:0px;
text-align:center;
font-size:10px;
border:none;">
<span>${'100m'}</span>
</div>`;
// 지도 기본 설정
const mapOptions = {
  center: new window.naver.maps.LatLng(33.38544662494779, 126.5550319629174),
  zoom: 11,
};

function NaverMap() {
  // * : 변수들
  const { markers, clickedDay, setClickedDay } = useContext(contexts);
  const polylines = useRef([]);
  // 첫 우클릭 체크 용
  const count = useRef(-1);
  // 중심좌표
  const centerPoint = useRef(null);
  let map;
  // * : 함수
  // 마커 클릭 이벤트 함수
  const getClickHandler = useCallback(
    (marker, infoWindow) => {
      // 왼쪽 사이드바 day가 클릭이 안되어 있을 경우 정보 표시
      // !: clickedDay가 바뀌면 무한으로 함수 렌더링 됨
      if (clickedDay.day) {
        setClickedDay({
          ...clickedDay,
          places: clickedDay.places.concat({
            name: marker.title,
            img: marker.img,
          }),
        });
      } else if (infoWindow.getMap()) {
        infoWindow.close();
      } else {
        infoWindow.open(map, marker);
      }
    },
    [clickedDay],
  );
  const initPolyLines = () => {
    count.current = -1;
    polylines.current = [];
    for (let i = 0; i < 5; i += 1) {
      const polyline = new window.naver.maps.Polyline({
        map,
        path: [],
        strokeColor: 'red',
        strokeWeight: 2,
      });
      polylines.current.push(polyline);
    }
  };
  const draw5Polylines = (point) => {
    const whichPolyline = count.current % 5;
    const path = polylines.current[whichPolyline].getPath();
    if (path.length === 0) {
      path.push(centerPoint.current);
      path.push(point);
    } else {
      path.splice(1, 1, point);
    }
    const milestone = new window.naver.maps.Marker({
      position: point,
      icon: {
        content: MileStone,
        anchor: new window.naver.maps.Point(10, -20),
      },
      map,
    });
  };
  useEffect(() => {
    map = new window.naver.maps.Map('map', mapOptions);
    initPolyLines();
    // 지도에 마커 그리기 + 각 마커에 클릭 이벤트 부착
    for (let i = 0; i < markers.length; i += 1) {
      // 지도에 마커 하나 그리기
      const marker = new window.naver.maps.Marker({
        map,
        title: markers[i].name,
        img: markers[i].img,
        position: new window.naver.maps.LatLng(markers[i].lat, markers[i].lng),
        zIndex: 100,
      });
      // 마커에 달릴 정보
      const infoWindow = new window.naver.maps.InfoWindow({
        content: `<div style="width:300px;text-align:center;padding:10px;"><b>
          ${markers[i].name}<br>
          사이트 : ${markers[i].site}<br>
          주소 : ${markers[i].address}<br>
          도로명 주소 : ${markers[i].address_road}<br>
          </b><br>-네이버 지도 -</div>`,
      });
      // 마커에 이벤트 부착
      window.naver.maps.Event.addListener(marker, 'mousedown', (e) => {
        if (e.domEvent.button === 2) {
          // 우클릭 이벤트
          const point = e.coord;
          // 중심좌표 설정
          if (count.current === -1) {
            centerPoint.current = point;
          } else {
            draw5Polylines(point);
          }
          count.current += 1;
        } else {
          // 좌클릭 이벤트
          getClickHandler(marker, infoWindow);
        }
      });
    }
  }, [markers, clickedDay]);
  return <div id="map" style={{ width: '100%', height: '100%' }} />;
}

export default NaverMap;
