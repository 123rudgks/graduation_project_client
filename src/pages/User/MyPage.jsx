import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import { AuthContext } from '../../helpers/AuthContext';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
// * : pages
import Navbar from '../../components/Navbar';
import { MapHomeRightTopBtn } from '../../components/MapHomeStyles/MapHomeRight.styles';

const MyPageContainer = styled.div`
  font-family: ${(props) => props.theme.defaultFont};
  height: 100vh;
  display: flex;
  flex-direction: column;
`;
const MyPageContent = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;
const MyPageHeader = styled.div`
  box-sizing: border-box;
  padding: 50px;
  display: flex;
  align-items: center;
  height: 100px;
  position: relative;
  & h1 {
    font-size: 2rem;
  }
  & button {
    position: relative;
    top: 5px;
    left: 15px;
    width: 100px;
    margin-left: 15px;
  }
`;
const MyPageBody = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  overflow: auto;
`;
const ScheduleCard = styled.div`
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  margin: 20px;
  width: 200px;
  height: 250px;
  display: flex;
  flex-direction: column;
  &:hover {
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.25), 0 5px 18px rgba(0, 0, 0, 0.2);
  }
  & img {
    flex: 3;
  }
  & div {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

function MyPage() {
  const { authState, setAuthState } = useContext(AuthContext);
  const navigate = useNavigate();
  const { username } = useParams();

  const onLogout = () => {
    localStorage.removeItem('accessToken');
    setAuthState({ username: '', email: '', status: false });
    // ! : 홈 화면 생성 이후 홈으로 이동
    navigate('/login');
  };
  // * : User accessToken authorization
  useEffect(async () => {
    // ! : 유효한 accessToken인지 백과 비교해보기
    // ! : accessToken을 서버로 보내서 유저 정보 다시 로딩하기
    if (!localStorage.getItem('accessToken')) {
      navigate('/login');
    }
    let basicInfo;
    try {
      basicInfo = await axios.get(
        `http://localhost:3001/users/basicInfo/${username}`,
      );
      console.log(basicInfo);
      setAuthState({
        username: basicInfo.data.username,
        email: basicInfo.data.email,
        status: true,
      });
    } catch (e) {
      console.log(e);
    }

    try {
      const myPageHistory = await axios.get(
        `http://localhost:3001/users/mypage-trip-history/${basicInfo.data.username}`,
      );
      console.log(myPageHistory);
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <MyPageContainer>
      <Navbar menus={['일정생성', '마이페이지']} />
      <MyPageContent>
        <MyPageHeader>
          <h1>{`${authState.username}의 여행기록`}</h1>
          <MapHomeRightTopBtn clicked={true}>회원정보수정</MapHomeRightTopBtn>
          <MapHomeRightTopBtn clicked={true} onClick={onLogout}>
            로그아웃
          </MapHomeRightTopBtn>
        </MyPageHeader>
        <MyPageBody>
          <ScheduleCard>
            <img src="https://i.ytimg.com/vi/b87fOgsKEZw/maxresdefault.jpg" />
            <div>일정제목</div>
            <div>생성날짜</div>
          </ScheduleCard>
          <ScheduleCard>
            <img src="https://i.ytimg.com/vi/b87fOgsKEZw/maxresdefault.jpg" />
            <div>일정제목</div>
            <div>생성날짜</div>
          </ScheduleCard>
          <ScheduleCard>
            <img src="https://i.ytimg.com/vi/b87fOgsKEZw/maxresdefault.jpg" />
            <div>일정제목</div>
            <div>생성날짜</div>
          </ScheduleCard>
          <ScheduleCard>
            <img src="https://i.ytimg.com/vi/b87fOgsKEZw/maxresdefault.jpg" />
            <div>일정제목</div>
            <div>생성날짜</div>
          </ScheduleCard>
          <ScheduleCard>
            <img src="https://i.ytimg.com/vi/b87fOgsKEZw/maxresdefault.jpg" />
            <div>일정제목</div>
            <div>생성날짜</div>
          </ScheduleCard>
          <ScheduleCard>
            <img src="https://i.ytimg.com/vi/b87fOgsKEZw/maxresdefault.jpg" />
            <div>일정제목</div>
            <div>생성날짜</div>
          </ScheduleCard>
          <ScheduleCard>
            <img src="https://i.ytimg.com/vi/b87fOgsKEZw/maxresdefault.jpg" />
            <div>일정제목</div>
            <div>생성날짜</div>
          </ScheduleCard>
          <ScheduleCard>
            <img src="https://i.ytimg.com/vi/b87fOgsKEZw/maxresdefault.jpg" />
            <div>일정제목</div>
            <div>생성날짜</div>
          </ScheduleCard>
          <ScheduleCard>
            <img src="https://i.ytimg.com/vi/b87fOgsKEZw/maxresdefault.jpg" />
            <div>일정제목</div>
            <div>생성날짜</div>
          </ScheduleCard>
          <ScheduleCard>
            <img src="https://i.ytimg.com/vi/b87fOgsKEZw/maxresdefault.jpg" />
            <div>일정제목</div>
            <div>생성날짜</div>
          </ScheduleCard>
          <ScheduleCard>
            <img src="https://i.ytimg.com/vi/b87fOgsKEZw/maxresdefault.jpg" />
            <div>일정제목</div>
            <div>생성날짜</div>
          </ScheduleCard>
        </MyPageBody>
      </MyPageContent>
    </MyPageContainer>
  );
}

export default MyPage;
