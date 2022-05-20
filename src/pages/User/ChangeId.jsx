import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import axios from 'axios';
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

const SearchIdContainer = styled(MainContainer)`
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 10;
  position: fixed;
  top: 0;
  left: 0;
`;
const SearchIdContent = styled(FormContents)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  height: 300px;
  box-shadow: none;
`;
const EmailDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80%;
`;
const EmailBtn = styled.input`
  flex: auto;
`;
function ChangeId({ username, setOpenChangeId }) {
  const [newUserName, setNewUserName] = useState('');
  const onChange = () => {
    if (!newUserName) {
      alert('username을 작성해주세요');
      return;
    }
    alert("변경완료")
  };
  return (
    <SearchIdContainer onClick={() => setOpenChangeId(false)}>
      <SearchIdContent onClick={(e) => e.stopPropagation()}>
        <LoginText>
          <div />
          <h1>ID 변경</h1>
        </LoginText>
        <h3>변경하려고 하는 아이디를 입력하세요</h3>
        <EmailDiv>
          <h1>변경 전</h1>
          <LoginInput value={username} readOnly />
        </EmailDiv>
        <EmailDiv>
          <h1>변경 후</h1>
          <LoginInput
            value={newUserName}
            onChange={(e) => setNewUserName(e.target.value)}
          />
        </EmailDiv>
        <input type="button" value="변경하기" onClick={onChange} />
      </SearchIdContent>
    </SearchIdContainer>
  );
}

ChangeId.propTypes = {
  username: PropTypes.string,
  setOpenChangeId: PropTypes.func.isRequired,
};
export default ChangeId;
