import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
// * : helpers
import { contexts } from "../../helpers/contexts";
// * : components
import {
  MapHomeRightTop,
  MapHomeRightBottom,
  SearchPlace,
  RecommendedPlace,
  PlaceCard,
  IconDiv,
  MapHomeRightTopBtn,
} from "../../components/MapHomeStyles/MapHomeRight.styles";
import { BiPlusCircle, BiMinusCircle } from "react-icons/bi";
import { IconContext } from "react-icons";
import axios from "axios";

// 임시 데이터 배열들
let hotels = [
  {
    tag: "hotel",
    name: "Mido Hostel",
    lat: 33.27815231323584,
    lng: 126.56429897443971,
    onMap: false,
  },
  {
    tag: "hotel",
    name: "서귀포 칼호텔",
    lat: 33.27815231323582,
    lng: 126.58489833837135,
    onMap: false,
  },
  {
    tag: "hotel",
    name: "제주 라온호텔 앤 리조트",
    lat: 33.38997896868579,
    lng: 126.1780436084178,
    onMap: false,
  },
  {
    tag: "hotel",
    name: "호텔시리우스",
    lat: 33.53135483196625,
    lng: 126.47297480813681,
    onMap: false,
  },
  {
    tag: "hotel",
    name: "신라호텔 제주",
    lat: 33.27742072055967,
    lng: 126.41392329819936,
    onMap: false,
  },
  {
    tag: "hotel",
    name: "메종 글래드 제주",
    lat: 33.47925288929469,
    lng: 126.50112727217673,
    onMap: false,
  },
  {
    tag: "hotel",
    name: "그라벨호텔제주",
    lat: 33.52604619747114,
    lng: 126.41598291505275,
    onMap: false,
  },
  {
    tag: "hotel",
    name: "유탑유블레스호텔 제주",
    lat: 33.58098024738009,
    lng: 126.66866844594779,
    onMap: false,
  },
  {
    tag: "hotel",
    name: "베키니아 호텔 제주",
    lat: 33.51058970334689,
    lng: 126.36585779615235,
    onMap: false,
  },
  {
    tag: "hotel",
    name: "신라스테이 제주",
    lat: 33.47107722964649,
    lng: 126.48327417056284,
    onMap: false,
  },
];
let places = [
  {
    tag: "place",
    name: "민트카페",
    lat: 33.51684054777192,
    lng: 126.52305944356527,
    onMap: false,
  },
  {
    tag: "place",
    name: "카페송키",
    lat: 33.51513485129444,
    lng: 126.52024199486168,
    onMap: false,
  },
  {
    tag: "place",
    name: "까미노",
    lat: 33.457891701949194,
    lng: 126.3481520643485,
    onMap: false,
  },
  {
    tag: "place",
    name: "만지식당",
    lat: 33.46403154000968,
    lng: 126.33900570299143,
    onMap: false,
  },
  {
    tag: "place",
    name: "명리동식당 애월점",
    lat: 33.47305301296182,
    lng: 126.34926246961572,
    onMap: false,
  },
  {
    tag: "place",
    name: "더애월 흑돼지김치찌개두루치기 전문점 본점",
    lat: 33.45704999387928,
    lng: 126.34891914688355,
    onMap: false,
  },
  {
    tag: "place",
    name: "박물관은살아있다",
    lat: 33.26642733261326,
    lng: 126.40745645356739,
    onMap: false,
  },
  {
    tag: "place",
    name: "아르뗴뮤지엄 제주",
    lat: 33.397537810529364,
    lng: 126.34570034036585,
    onMap: false,
  },
  {
    tag: "place",
    name: "새벽오름",
    lat: 33.36651493829146,
    lng: 126.3566973740892,
    onMap: false,
  },
  {
    tag: "place",
    name: "제주러브랜드",
    lat: 33.45186177096573,
    lng: 126.48999999803783,
    onMap: false,
  },
];

function MapHomeRight({ placesAll, setPlacesAll }) {
  // * : states
  // 지도위에 있는 마커들 배열
  const { markers, setMarkers } = useContext(contexts);
  // 현재 클릭한 버튼에 따른 하단 컨텐츠들 (장소 또는 호텔)
  const [currentContents, setCurrentContents] = useState(hotels);
  // 호텔들 정보
  const [hotelContents, setHotelContents] = useState(hotels);
  // 장소들 정보
  const [placeContents, setPlaceContents] = useState(places);
  // 클릭한 버튼
  const [clickedBtn, setClickedBtn] = useState("추천 호텔");
  // input 값
  const [searchValue, setSearchValue] = useState("");
  // * : functions
  // 지도위에 마커 추가 함수
  const addMarkerOnMap = (item) => {
    switch (item.tag) {
      case "hotel":
        const newHotels = hotelContents.map((_item) => {
          if (item.name === _item.name) {
            return { ...item, onMap: true };
          }
          return _item;
        });
        setHotelContents(newHotels);
        break;
      case "place":
        const newPlaces = placeContents.map((_item) => {
          if (item.name === _item.name) {
            return { ...item, onMap: true };
          }
          return _item;
        });
        setPlaceContents(newPlaces);
        break;
    }
    // 지도위에 현재 클릭한 마커 추가
    setMarkers(markers.concat({ ...item, onMap: true }));
  };
  // 지도위에 마커 제거 함수
  const removeMarkerFromMap = (item) => {
    switch (item.tag) {
      case "hotel":
        const newHotels = hotelContents.map((_item) => {
          if (item.name === _item.name) {
            return { ...item, onMap: false };
          }
          return _item;
        });
        setHotelContents(newHotels);
        break;
      case "place":
        const newPlaces = placeContents.map((_item) => {
          if (item.name === _item.name) {
            return { ...item, onMap: false };
          }
          return _item;
        });
        setPlaceContents(newPlaces);
        break;
    }
    // 마커 배열에서 onMap이 false된 아이템 제거
    const newMarkers = markers.filter((_item) => {
      if (item.name === _item.name) {
        return false;
      }
      return true;
    });
    setMarkers(newMarkers);
  };
  // input창 submit
  const onSubmit = async (value) => {
    console.log(value);
    await axios
      .post("http://localhost:3001/search/search", { search: searchValue })
      .then((res) => {
        setCurrentContents([
          {
            tag: "place",
            name: res.data.title,
            img: res.data.item_img,
            lng: res.data.lng,
            lat: res.data.lat,
            onMap: false,
          },
        ]);
      });
  };

  useEffect(() => {
    // 클릭한 버튼에 따라 표시되는 장소 카드들의 상태(+,-)를 최신값으로 유지
    switch (clickedBtn) {
      case "추천 호텔":
        setCurrentContents(hotelContents);
        break;
      case "추천 장소":
        setCurrentContents(placeContents);
        break;
      default:
        setCurrentContents(markers);
    }
  }, [hotelContents, placeContents, markers, clickedBtn]);

  return (
    <>
      <MapHomeRightTop>
        <SearchPlace
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              onSubmit(searchValue);
            }
          }}
        />
        <RecommendedPlace>
          <MapHomeRightTopBtn
            clicked={clickedBtn === "추천 호텔"}
            onClick={() => {
              setClickedBtn("추천 호텔");
            }}
          >
            추천 호텔
          </MapHomeRightTopBtn>
          <MapHomeRightTopBtn
            clicked={clickedBtn === "추천 장소"}
            onClick={() => {
              setClickedBtn("추천 장소");
            }}
          >
            추천 장소
          </MapHomeRightTopBtn>
        </RecommendedPlace>
        <MapHomeRightTopBtn
          clicked={clickedBtn === "선택한 장소"}
          onClick={() => {
            setClickedBtn("선택한 장소");
          }}
        >
          선택한 장소
        </MapHomeRightTopBtn>
      </MapHomeRightTop>
      <MapHomeRightBottom>
        {currentContents.map((item, index) => {
          return (
            <PlaceCard key={index}>
              <img src={item.img} alt="이미지 안뜸" />
              <div>
                <div>{currentContents[index].name}</div>
                <IconDiv>
                  {item.onMap ? (
                    <BiMinusCircle
                      color="red"
                      size={18}
                      onClick={() => {
                        removeMarkerFromMap(item, index);
                      }}
                    />
                  ) : (
                    <BiPlusCircle
                      size={18}
                      onClick={() => {
                        addMarkerOnMap(item);
                      }}
                    />
                  )}
                </IconDiv>
              </div>
            </PlaceCard>
          );
        })}
      </MapHomeRightBottom>
    </>
  );
}

export default MapHomeRight;
