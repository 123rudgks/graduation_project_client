import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styled from 'styled-components';
import Navbar from '../../components/Navbar';
import axios from 'axios';
import {
  MainContainer,
  FormContainer,
  FormContents,
  LoginText,
  LoginInput,
  ButtonContainer,
} from '../../components/UserStyles/UserStyles';
import SearchId from './SearchId';

function Login() {
  const [openSearchId, setOpenSearchId] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('required'),
      password: Yup.string().required('required')
    }),
    onSubmit: async (values) => {
      let isLogin = null;
    try {
      isLogin = await axios.post('http://localhost:3001/users/login', values);
    } catch (e) {
      console.log(e);
      return;
    }
    if (!isLogin.data.error) {
      navigate('../mapHome');
      console.log('login success');
    } else {
      alert(isLogin.data.error);
    }
    },
  });

  
  return (
    <MainContainer>
      <Navbar menus={['일정생성', '추천코스']} />
      {openSearchId && <SearchId setOpenSearchId={setOpenSearchId}/>}
      <FormContainer>
        <FormContents onSubmit={formik.handleSubmit}>
          <LoginText>
            <div />
            <h1>Sign In</h1>
            <h3>Enter your credentials to access your account.</h3>
          </LoginText>
          <LoginInput
            id="username"
            name="username"
            placeholder="username"
            value={formik.values.username}
            isWrong={formik.touched.username && formik.errors.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          <LoginInput
            id="password"
            name="password"
            type="password"
            placeholder="password"
            value={formik.values.password}
            isWrong={formik.touched.password && formik.errors.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}

          />
          <ButtonContainer>
            <input type="button" value="ID 찾기" onClick={()=>setOpenSearchId(true)}/>
            <input type="button" value="PW 찾기" />
            <input
              type="button"
              value="회원가입"
              onClick={() => {
                navigate('../signup');
              }}
            />
            <input type="submit" value="로그인"/>
          </ButtonContainer>
        </FormContents>
      </FormContainer>
    </MainContainer>
  );
}

export default Login;
