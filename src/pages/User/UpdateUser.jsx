import React, { useContext, useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import styled from 'styled-components';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  MainContainer,
  FormContainer,
  FormContents,
  LoginText,
  LoginInput,
  ButtonContainer,
} from '../../components/UserStyles/UserStyles';
import ChangeId from './ChangeId';
import ChangePw from './ChangePw';
import axios from 'axios';
// * : helpers
import { AuthContext } from '../../helpers/AuthContext';

const UserInfoDiv = styled.div`
  width: 80%;
  display: flex;
  align-items: center;
  & h1{
    width:90px;
  }
  & input{
    margin-left: 5px;
    flex: 1;
    text-align: center;
  }
`;

function UpdateUser() {
  const [openChangeId, setOpenChangeId] = useState(false);
  const [openChangePw, setOpenChangePw] = useState(false);
  const { authState, setAuthState } = useContext(AuthContext);

  // * : formik

  // * : useEffects

  const onDeleteUser = () =>{
    const willDelete = confirm('정말 탈퇴 하시겠습니까?');
  }
  // 유저 정보 받아오기
  useEffect(async () => {
    let basicInfo;
    const username = localStorage.getItem('username');
    try {
      basicInfo = await axios.get(
        `http://localhost:3001/users/basicInfo/${username}`,
      );
      setAuthState({
        username: basicInfo.data.username,
        email: basicInfo.data.email,
        status: true,
      });
    } catch (e) {
      console.log(e);
    }
  }, []);
  return (
    <MainContainer>
      <Navbar menus={['일정생성', '마이페이지']} />
      {openChangeId && <ChangeId username = {authState.username} setOpenChangeId={setOpenChangeId}/>}
      {openChangePw && <ChangePw  setOpenChangePw={setOpenChangePw}/>}
      <FormContainer>
        <FormContents>
          <LoginText>
            <div />
            <h1>Edit Profile</h1>
            <h3>Edit your Sign In Information.</h3>
          </LoginText>
          <UserInfoDiv>
            <h1>USERNAME : </h1>
            <input value={authState.username} readOnly/>
          </UserInfoDiv>
          <UserInfoDiv>
            <h1>E-MAIL : </h1>
            <input value={authState.email} readOnly/>
          </UserInfoDiv>
          
          <ButtonContainer>
            <input
              type="button"
              value="ID 변경"
              onClick={() => setOpenChangeId(true)}
            />
            <input
              type="button"
              value="PW 변경"
              onClick={() => setOpenChangePw(true)}
            />
            <input
              type="button"
              value="회원 탈퇴"
              onClick={onDeleteUser}
            />
          </ButtonContainer>
        </FormContents>
      </FormContainer>
    </MainContainer>
  );
}

export default UpdateUser;
