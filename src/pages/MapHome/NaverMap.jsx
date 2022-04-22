import React, {
  useEffect,
  useContext,
  useCallback,
  useState,
  useRef,
} from 'react';
import styled from 'styled-components';
import axios from 'axios';
// * : helpers
import { contexts } from '../../helpers/contexts';

/**
 * 1. useState 대신 useRef Tms dlfb?
 * 2. 한 useEffect 에 라인 관련, 마커 관련 섞여있는 이유?
 * 3. path 에 큐 도입 하져
 */

const MileStone = (distance, time) => `
<div style=
"display:inline-block;
padding:0px;
text-align:center;
font-size:15px;
border:none;">
<div>${distance || '? '}km</div>
<div>${time || '? '}</div>
</div>`;
// 지도 기본 설정
const mapOptions = {
  center: new window.naver.maps.LatLng(33.38544662494779, 126.5550319629174),
  zoom: 11,
};

function NaverMap() {
  // * : 변수들
  const { markers, clickedDay, setClickedDay } = useContext(contexts);
  // const polyLines = useRef([]);
  // const mileStones = useRef([]);
  const [mileStones, setMileStones] = useState([]);
  const [polyLines, setPolyLines] = useState([]);

  // 첫 우클릭 체크 용
  // const count = useRef(-1);
  // 중심좌표
  const centerPoint = useRef({ point: null, title: '' });
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

  // const createPolyline = () => {
  //   const polyline = new window.naver.maps.Polyline({
  //     map,
  //     path: [],
  //     strokeColor: 'red',
  //     strokeWeight: 2,
  //   });
  //   return polyline;
  // };

  const getInfoFromCenterPoint = (point) =>
    axios.post('http://localhost:3001/compare-distance', {
      start: [
        centerPoint.current.point['_lng'],
        centerPoint.current.point['_lat'],
      ],
      goal: [point['_lng'], point['_lat']],
    });
  const milliToTime = (milliSec) => {
    const hour = Math.floor((milliSec / (1000 * 60 * 60)) % 24);
    const minute = Math.floor(
      (milliSec - hour * (1000 * 60 * 60)) / (1000 * 60),
    );
    if (hour >= 1) {
      return `${hour}시간${minute}분`;
    }
    return `${minute}분`;
  };
  useEffect(() => {
    // 지도 생성
    map = new window.naver.maps.Map('map', mapOptions);
    // 마커 + 이벤트 생성기
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
      // 마커 이벤트 리스너
      window.naver.maps.Event.addListener(marker, 'mousedown', async (e) => {
        if (e.domEvent.button === 2) {
          // 중심 좌표 클릭 시 초기화
          if (e.overlay.title === centerPoint.current.title) {
            console.log('중심좌표 초기화');
            centerPoint.current = { point: null, title: null };
            setMileStones([]);
            setPolyLines([]);
            return;
          }
          const point = e.coord;
          if (!centerPoint.current.point) {
            console.log('중심좌표 설정 완료');
            centerPoint.current = { point, title: e.overlay.title };
          } else {
            // polyLines 추가
            setPolyLines(
              polyLines.concat({
                map,
                path: [centerPoint.current.point, point],
                strokeColor: 'red',
                strokeWeight: 2,
              }),
            );
            // mileStone 추가
            try {
              const roadInfo = await getInfoFromCenterPoint(point);
              const { distance, time } = roadInfo.data;
              setMileStones(
                mileStones.concat({
                  position: point,
                  icon: {
                    content: MileStone(
                      Math.round((distance / 1000) * 10) / 10,
                      milliToTime(time),
                    ),
                    anchor: new window.naver.maps.Point(10, -20),
                  },
                  map,
                }),
              );
            } catch (err) {
              console.error(err);
            }
          }
        } else {
          console.log('좌클릭 실행');
          getClickHandler(marker, infoWindow);
        }
      });
    }
    // polyLine, mileStone 그리기
    polyLines.map(
      (polyLine) => new window.naver.maps.Polyline({ ...polyLine, map: map }),
    );
    mileStones.map(
      (mileStone) => new window.naver.maps.Marker({ ...mileStone, map: map }),
    );
  }, [markers, clickedDay, polyLines, mileStones]);

  // ! : 생성
  // useEffect(() => {
  //  map = new window.naver.maps.Map('map', mapOptions);
  //   // 1. 맵 그리기
  //   // 2. 마커 그리기
  //  // map = new window.naver.maps.Map('map', mapOptions);
  //   console.log('2번');

  //   count.current = -1;
  //   //polyLines.current = [];
  //   centerPoint.current = { point: null, title: null };
  //   setMileStonesState([]);
  //   setPolyLinesState([]);

  //   // 5개의 polyline 객체 생성
  //   for (let i = 0; i < 5; i += 1) {
  //     // const newPolyline = createPolyline();
  //     polyLines.current.push({
  //       map,
  //       path: [],
  //       strokeColor: 'red',
  //       strokeWeight: 2,
  //     });
  //   }

  //   for (let i = 0; i < markers.length; i += 1) {
  //     // 지도에 마커 하나 그리기
  //     const marker = new window.naver.maps.Marker({
  //       map,
  //       title: markers[i].name,
  //       img: markers[i].img,
  //       position: new window.naver.maps.LatLng(markers[i].lat, markers[i].lng),
  //       zIndex: 100,
  //     });
  //     // 마커에 달릴 정보
  //     const infoWindow = new window.naver.maps.InfoWindow({
  //       content: `<div style="width:300px;text-align:center;padding:10px;"><b>
  //         ${markers[i].name}<br>
  //         사이트 : ${markers[i].site}<br>
  //         주소 : ${markers[i].address}<br>
  //         도로명 주소 : ${markers[i].address_road}<br>
  //         </b><br>-네이버 지도 -</div>`,
  //     });
  //     // 마커에 이벤트 부착
  //     // eslint-disable-next-line no-loop-func
  //     window.naver.maps.Event.addListener(marker, 'mousedown', async (e) => {
  //       if (e.domEvent.button === 2) {
  //         // * centerPoint를 클릭 했을 경우 initPolyLines
  //         // 우클릭 이벤트
  //         const point = e.coord;

  //         // if (e.overlay.title === centerPoint.current.title) {
  //         //   console.log('');
  //         //   initPolyLines();
  //         //   setClickedDay(2);
  //         //   // mileStone 초기화
  //         //   // re-render 시켜야 함
  //         // }
  //         if (!centerPoint.current.point) {
  //           console.log('중심좌표 설정 완료');
  //           centerPoint.current = { point, title: e.overlay.title };
  //         } else {
  //           const whichPolyline = count.current % 5;
  //           // const path = polyLines.current[whichPolyline].getPath();
  //           polyLines.current = polyLines.current.map((polyLine,i)=>{
  //             if(i === whichPolyline ){
  //               return {...polyLine, path: [centerPoint.current.point, point]}
  //             }
  //             return polyLine ;
  //           })
  //           setPolyLinesState(polyLinesState.concat({
  //             map,
  //             path: [centerPoint.current.point, point],
  //             strokeColor: 'red',
  //             strokeWeight: 2,
  //           }))
  //           console.log('polyline setting');
  //           // if (path.length === 0) {
  //           //   path.push(centerPoint.current.point);
  //           //   path.push(point);
  //           // } else {
  //           //   path.splice(1, 1, point);
  //           // }

  //           try {
  //             const roadInfo = await getInfoFromCenterPoint(point);
  //             const { distance, time } = roadInfo.data;

  //             // ! : 거리: 소수점 두번째에서 반올림, 시간 : 1시간 이상일 경우, 시간,분 1시간 미만일 경우 분으로만 표시
  //             // mileStones.current[whichPolyline] = new window.naver.maps.Marker({
  //             //   position: point,
  //             //   icon: {
  //             //     content: MileStone(
  //             //       distance / 1000,
  //             //       (time / (1000 * 60 * 60)) % 24,
  //             //     ),
  //             //     anchor: new window.naver.maps.Point(10, -20),
  //             //   },
  //             //   map,
  //             // });
  //             setMileStonesState(mileStonesState.concat({
  //               position: point,
  //               icon: {
  //                 content: MileStone(
  //                   distance / 1000,
  //                   (time / (1000 * 60 * 60)) % 24,
  //                 ),
  //                 anchor: new window.naver.maps.Point(10, -20),
  //               },
  //               map,
  //             }));
  //           } catch (err) {
  //             console.error(err);
  //           }
  //         }
  //         count.current += 1;
  //       } else {
  //         // 좌클릭 이벤트
  //         getClickHandler(marker, infoWindow);
  //         setMileStonesState(1);
  //       }
  //     });
  //   }
  //   // 지도에 마커 그리기 + 각 마커에 클릭 이벤트 부착
  // }, [markers, clickedDay]);
  return <div id="map" style={{ width: '100%', height: '100%' }} />;
}

export default NaverMap;
