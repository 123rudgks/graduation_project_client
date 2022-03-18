import React, { useEffect, useState, useContext } from "react";
import styled from "styled-components";
// * : helpers
import { contexts } from "../../helpers/contexts";
// * : components
import {
  Header,
  Contents,
  DayBox,
  DayTitle,
} from "../../components/MapHomeStyles/MapHomeLeft.styles";
import {
  PlaceCard,
  IconDiv,
} from "../../components/MapHomeStyles/MapHomeRight.styles";
import { BiMinusCircle } from "react-icons/bi";

function MapHomeLeft() {
  // * : 임시로 만든 변수들. 차후 수정 요함
  const startDate = new Date("2022-02-01");
  const endDate = new Date("2022-02-05");
  const totalPeriod = (endDate - startDate) / (1000 * 60 * 60 * 24) + 1;
  const startDateStr = `${startDate.getFullYear()}.${
    startDate.getMonth() + 1
  }.${startDate.getDay()}`;
  const endDateStr = `${endDate.getFullYear()}.${
    endDate.getMonth() + 1
  }.${endDate.getDay()}`;

  // * : states
  // 각 날짜별 정보 (날짜, 클릭여부, 선택된 장소들)
  const [days, setDays] = useState(() => {
    const initDays = [];
    for (let i = 1; i <= totalPeriod; i++) {
      initDays.push({ day: i, clicked: false, places: [] });
    }
    return initDays;
  });
  // 클릭한 날짜 정보 (날짜, 선택된 장소들)
  const { clickedDay, setClickedDay } = useContext(contexts);

  // * : functions
  // 각 day title 클릭 시 clicked 변경 함수
  const onDayTitle = (index) => {
    const newDays = days.map((_item, _index) => {
      if (index === _index) {
        setClickedDay({ day: _item.day, places: _item.places });
        return { ..._item, clicked: true };
      }
      return { ..._item, clicked: false };
    });
    setDays(newDays);
  };
  // day외의 창 클릭 시 day clear
  const onClearDay = () => {
    const tempDays = days.map((_item, _index) => {
      return { ..._item, clicked: false };
    });
    setClickedDay({ day: 0, places: [] });
    setDays(tempDays);
  };
  // 카드의 - 버튼 클릭 시 해당 장소를 days에서 제거
  const removeFromDay = (day, place) => {
    const newPlaces = day.places.filter((_place) => {
      if (place === _place) {
        return false;
      }
      return true;
    });
    const newDays = days.map((_item) => {
      if (_item.day === day.day) {
        return { ..._item, places: newPlaces };
      }
      return _item;
    });
    setDays(newDays);
    // clickedDay의 places와 days의 places와 동기화 해주기 위함
    if (day.day === clickedDay.day) {
      setClickedDay({ ...clickedDay, places: newPlaces });
    }
  };

  useEffect(() => {
    // NaverMap에서 클릭한 marker 정보 day에 저장
    const newDays = days.map((_item, _index) => {
      if (clickedDay.day === _item.day) {
        return { ..._item, places: clickedDay.places };
      }
      return _item;
    });
    setDays(newDays);
  }, [clickedDay]);
  return (
    <>
      <Header
        onClick={() => {
          onClearDay();
        }}
      >
        <div>제주도</div>
        <div>
          {startDateStr} ~ {endDateStr}
        </div>
      </Header>
      <Contents
        onClick={() => {
          onClearDay();
        }}
      >
        {days.map((item, index) => (
          <DayBox
            key={index}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            <DayTitle
              clicked={item.clicked}
              onClick={() => {
                onDayTitle(index);
              }}
            >
              Day {item.day}
            </DayTitle>
            {item.places.map((place,index) => (
              <PlaceCard key={index}>
                <img
                  src={
                    "https://media-cdn.tripadvisor.com/media/photo-s/19/86/41/82/thessaloniki-greece-s.jpg"
                  }
                  alt="이미지 안뜸"
                />
                <div>
                  <div>{place}</div>
                  <IconDiv>
                    <BiMinusCircle
                      size={20}
                      onClick={() => {
                        removeFromDay(item, place);
                      }}
                    />
                  </IconDiv>
                </div>
              </PlaceCard>
            ))}
          </DayBox>
        ))}
      </Contents>
      <CreateBtn>일정 생성</CreateBtn>
    </>
  );
}

const CreateBtn = styled.button`
border: none;
  display: block;
  height: 50px;
  min-height: 50px;
  background-color: #dcfcfc;
  border-radius: 10px;
`;

export default MapHomeLeft;
