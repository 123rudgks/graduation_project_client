// * : library
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import PropTypes from 'prop-types';
// * : helpers
import { AuthContext } from '../../helpers/AuthContext';
// * : components
import { ImArrowRight } from 'react-icons/im';
/* ------------------------------------------------------------------------------------------------------------ */
// * : styled Components
const ConfirmBackground = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 1000;
`;
const ConfirmContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  display: flex;
  flex-direction: column;
  width: 80%;
  height: 80vh;
  background-color: white;
`;
const DescriptionContainer = styled.div`
  width: 100%;
  height: 20%;
`;
const DescriptionContents = styled.div`
  display: flex;
  padding: 10px;
  justify-content: space-around;
`;
const DescriptionInputContainer = styled.div`
  flex: 1;
  display: flex;
  margin-left: -1px;
  border: 1px solid black;
`;
const DescriptionTitle = styled.div`
  flex: auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border-right: 1px solid black;
  background-color: ${(props) => props.theme.mainColor};
`;
const DescriptionInput = styled.input`
  box-sizing: border-box;
  border: none;
  &:focus {
    outline: none;
  }
  width: 80%;
  height: 40px;
`;
const ScheduleContainer = styled.div`
  flex: auto;
  overflow: auto;
`;
const DayContainer = styled.div`
  padding: 10px;
`;
const Day = styled.div`
  margin-bottom: 10px;
`;
const DayCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 40px;
  background-color: ${(props) => props.theme.mainColor};
`;
const Places = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const CardContainer = styled.div`
  display: flex;
`;
const PlacesCard = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 100px;
  & img {
    width: 100%;
    height: 100px;
  }
  & div {
    flex: 1;
    margin: 0%;
    padding: 0;
  }
`;
const ArrowCard = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  margin-bottom: 10px;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 100px;
`;
const ButtonContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  width: 200px;
  justify-content: space-between;
  & input {
    width: 80px;
    height: 40px;
  }
`;

// * : Main Function
function ConfirmSchedule({ setIsConfirmScheduleOpen, scheduleInfo }) {
  // * : states
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  // * : hooks
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();
  // * : functions
  const onSubmit = async () => {
    if(!title){
      alert("일지 제목을 작성해주세요");
      return;
    }
    console.log({
      username: authState.username,
      area: scheduleInfo.area,
      startDate: scheduleInfo.startDateStr,
      thumbnail: scheduleInfo.days[0].places[0].img,
      endDate: scheduleInfo.endDateStr,
      tripTitle: title,
      description,
      days: scheduleInfo.days,
    });
    await axios
      .post(
        'http://localhost:3001/users/trip-schedule',
        {
          username: authState.username,
          area: scheduleInfo.area,
          startDate: scheduleInfo.startDateStr,
          thumbnail: scheduleInfo.days[0].places[0].img,
          endDate: scheduleInfo.endDateStr,
          tripTitle: title,
          description,
          days: scheduleInfo.days,
        },
        { headers: { 'x-auth-token': localStorage.getItem('accessToken') } },
      )
      .then((res) => {
        alert('저장 되었습니다.');
        navigate(`/myPage/${authState.username}`);
      })
      .catch((e) => {
        alert('저장 실패 : error 발생');
        console.log(e);
      });
  };

  // {
  //   "day" : 1,
  //   "places": [
  //      {
  //                "name" : "헬스장1",
  //                "img" : "http://tong.visitkorea.or.kr/cms/resource/08/2650208_image2_1.jpg"
  //            },

  // {
  //   "day" : 1,
  //       "order": 1,
  //       "name" : "헬스장1",
  //       "img" : "http://tong.visitkorea.or.kr/cms/resource/08/2650208_image2_1.jpg"
  //    },

  return (
    <ConfirmBackground onClick={() => setIsConfirmScheduleOpen(false)}>
      <ConfirmContainer onClick={(e) => e.stopPropagation()}>
        <DescriptionContainer>
          <DescriptionContents>
            <DescriptionInputContainer>
              <DescriptionTitle>{scheduleInfo.area}</DescriptionTitle>
              <DescriptionInput
                value={`${scheduleInfo.startDateStr} ~ ${scheduleInfo.endDateStr}`}
                readOnly
              />
            </DescriptionInputContainer>
            <DescriptionInputContainer>
              <DescriptionTitle>Title</DescriptionTitle>
              <DescriptionInput
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </DescriptionInputContainer>
          </DescriptionContents>
          <DescriptionContents>
            <DescriptionInputContainer>
              <DescriptionTitle>Description</DescriptionTitle>
              <DescriptionInput
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </DescriptionInputContainer>
          </DescriptionContents>
        </DescriptionContainer>

        <ScheduleContainer>
          <DayContainer>
            {scheduleInfo.days.map((day, i) => (
              <div key={i}>
                <Day>
                  <DayCard>{`Day ${day.day}`}</DayCard>
                </Day>
                <Places>
                  {day.places.map((place, i) => (
                    <CardContainer key={i}>
                      <PlacesCard>
                        <img src={place.img} />
                        <div>{place.name}</div>
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
        <ButtonContainer>
          <input type="button" value="수정" />
          <input type="button" value="저장" onClick={onSubmit} />
        </ButtonContainer>
      </ConfirmContainer>
    </ConfirmBackground>
  );
}

// * : prop Validation
ConfirmSchedule.propTypes = {
  setIsConfirmScheduleOpen: PropTypes.func.isRequired,
  scheduleInfo: PropTypes.object.isRequired,
};

export {
  ConfirmBackground,
  ConfirmContainer,
  DescriptionContainer,
  DescriptionContents,
  DescriptionInputContainer,
  DescriptionTitle,
  DescriptionInput,
  ScheduleContainer,
  DayContainer,
  Day,
  DayCard,
  Places,
  CardContainer,
  PlacesCard,
  ArrowCard,
  ButtonContainer,
};
export default ConfirmSchedule;
