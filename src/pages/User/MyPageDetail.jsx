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
              <DescriptionInput value={scheduleInfo.description} readOnly />
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
