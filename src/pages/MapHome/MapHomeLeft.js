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
  const tempDays = [];
  for (let i = 1; i <= totalPeriod; i++) {
    tempDays.push({ day: i, clicked: false, places: [] });
  }
  const [days, setDays] = useState(tempDays);
  const { clickedDay, setClickedDay } = useContext(contexts);

  // * : functions

  // 각 day title 클릭 시 clicked 변경 함수
  const onDayTitle = (index) => {
    const tempDays = days.map((_item, _index) => {
      if (index === _index) {
        setClickedDay({ day: _item.day, places: _item.places });
        return { ..._item, clicked: true };
      }
      return { ..._item, clicked: false };
    });
    setDays(tempDays);
  };
  const onClearDay = () => {
    const tempDays = days.map((_item, _index) => {
      return { ..._item, clicked: false };
    });
    setDays(tempDays);
    setClickedDay({ day: 0, places: [] });
  };
  // 카드의 - 버튼 클릭 시 day에서 제거
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
            {item.places.map((place) => (
              <PlaceCard>
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
  display: block;
  height: 50px;
  min-height: 50px;
  background-color: #dcfcfc;
  border-radius: 10px;
`;

export default MapHomeLeft;
