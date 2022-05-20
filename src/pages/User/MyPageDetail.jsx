// * : library
import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// * : helpers
import { AuthContext } from '../../helpers/AuthContext';
// * : components
import { ImArrowRight } from 'react-icons/im';
import {
  ConfirmBackground,
  ConfirmContainer,
  DescriptionContainer,
  DescriptionContents,
  DescriptionTitle,
  DescriptionInputContainer,
  DescriptionInput,
  ScheduleContainer,
  DayContainer,
  Day,
  DayCard,
  Places,
  CardContainer,
  PlacesCard,
  ArrowCard,
} from '../MapHome/ConfirmSchedule';

const DeleteSchedule = styled.input`
  position: absolute;
  bottom: 30px;
  right: 30px;
  width: 80px;
  height: 30px;
  border: none;
  border-radius: 10px;
  background-color: #fff7cd;
  box-shadow: 0px 0px 5px 2px #ebebeb;
  &:hover {
    box-shadow: 0px 0px 3px 1.5px #f0f0f0;
    font-size: 0.8rem;
  }
  &:active {
    box-shadow: none;
  }
`;

const placesConvertor = (places) => {
  let days = [];
  let transforedPlaces = [];
  places.map((place) => {
    if (!days.includes(place.day)) {
      days.push(place.day);
    }
  });
  days.map((day) => {
    transforedPlaces.push({
      day,
      places: places.filter((place) => place.day === day),
    });
  });
  return transforedPlaces;
};
function MyPageDetail({ setIsConfirmScheduleOpen, scheduleInfo }) {
  const [formedPlaces, setFormedPlaces] = useState([]);
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();
  const onDeleteSchedule = () => {
    console.log(scheduleInfo.page_id);
    // pageId로 스케쥴 삭제
  };
  useEffect(() => {
    const tempPlaces = placesConvertor(scheduleInfo.places);
    setFormedPlaces(tempPlaces);
  }, []);
  return (
    <ConfirmBackground
      onClick={() => {
        setIsConfirmScheduleOpen(false);
        navigate(`/myPage/${authState.username}`);
      }}
    >
      <ConfirmContainer onClick={(e) => e.stopPropagation()}>
        <DescriptionContainer>
          <DescriptionContents>
            <DescriptionInputContainer>
              <DescriptionTitle>{scheduleInfo.area}</DescriptionTitle>
              <DescriptionInput
                value={`${scheduleInfo.startDay} ~ ${scheduleInfo.endDay}`}
                readOnly
              />
            </DescriptionInputContainer>
            <DescriptionInputContainer>
              <DescriptionTitle>Title</DescriptionTitle>
              <DescriptionInput value={scheduleInfo.title} readOnly />
            </DescriptionInputContainer>
          </DescriptionContents>
          <DescriptionContents>
            <DescriptionInputContainer>
              <DescriptionTitle>Description</DescriptionTitle>
              <DescriptionInput
                className="description"
                value={scheduleInfo.description}
                readOnly
              />
            </DescriptionInputContainer>
          </DescriptionContents>
        </DescriptionContainer>
        <ScheduleContainer>
          <DayContainer>
            {formedPlaces.map((day, i) => (
              <div key={i}>
                <Day>
                  <DayCard>{`Day ${day.day}`}</DayCard>
                </Day>
                <Places>
                  {day.places.map((place, i) => (
                    <CardContainer key={i}>
                      <PlacesCard>
                        <img src={place.placeImage} />
                        <div>{place.placeTitle}</div>
                      </PlacesCard>
                      {day.places.length !== i + 1 && (
                        <ArrowCard>
                          <ImArrowRight />
                        </ArrowCard>
                      )}
                    </CardContainer>
                  ))}
                </Places>
              </div>
            ))}
          </DayContainer>
        </ScheduleContainer>
        <DeleteSchedule
          type="button"
          value="일정 삭제"
          onClick={onDeleteSchedule}
        />
      </ConfirmContainer>
    </ConfirmBackground>
  );
}

// * : prop Validation
MyPageDetail.propTypes = {
  setIsConfirmScheduleOpen: PropTypes.func.isRequired,
  scheduleInfo: PropTypes.object.isRequired,
};
export default MyPageDetail;
