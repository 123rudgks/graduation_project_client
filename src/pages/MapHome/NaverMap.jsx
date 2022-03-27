import React, { useEffect, useContext } from 'react';
// * : helpers
import { contexts } from '../../helpers/contexts';

const mapOptions = {
  center: new window.naver.maps.LatLng(33.38544662494779, 126.5550319629174), // 지도의 중심좌표.
  zoom: 11,
};
// 지도위에 찍을 마커들 모은 배열
// const markers = [];
// 각 마커들에 대한 정보 배열
const infoWindows = [];

function NaverMap() {
  const { markers, clickedDay, setClickedDay } = useContext(contexts);
  // const [infoWindows, setInfoWindows] = useState([]);
  let map;

  // 마커 클릭 이벤트 함수
  const getClickHandler = (marker, infoWindow) => {
    // 왼쪽 사이드바 day가 클릭이 안되어 있을 경우 정보 표시
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

    // schedule 배열에서 clicked day와 일치하는 객체의 place에 클릭된 마커 넣어주기
    // __setSchedule([...__schedule]);
    // __현재 schedule은 객체이고 그 안의 schedule.days가 배열임
    // const tempSchedule = __schedule.days.map((item) => {
    //   if (item.day === __clickedDay) {
    //     item.place.push(markers[seq].title);
    //   }
    //   return item;
    // });
    // __setSchedule({ ...__schedule, days: tempSchedule });
    // };
  };

  useEffect(() => {
    map = new window.naver.maps.Map('map', mapOptions);

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
      window.naver.maps.Event.addListener(marker, 'click', () => {
        getClickHandler(marker, infoWindow);
      });
    }
  }, [markers, clickedDay]);
  return <div id="map" style={{ width: '100%', height: '100%' }} />;
}

export default NaverMap;
