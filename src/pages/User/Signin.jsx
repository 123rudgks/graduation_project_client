import React, { useState } from 'react';
import axios from 'axios';

function Signin() {
  const [signinInfo, setSigninInfo] = useState({
    email: '',
    password: '',
    username: '',
  });

  const onSubmit = async () => {
    const isLogin = await axios.post(
      'http://localhost:3001/users',
      signinInfo,
    ).then((e) => {
      console.log(e);
    });
    console.log(isLogin.data);
  };
  const onEmail = async () => {
    const isLogin = await axios.post(
      'http://localhost:3001/users/email-auth',
      signinInfo,
    ).then((e) => {
      console.log(e);
    });
    console.log(isLogin.data);
  };
  return (
    <div>
      <form>
        <input
          value={signinInfo.email}
          placeholder="email"
          onChange={(e) => setSigninInfo({ ...signinInfo, email: e.target.value })}
        />
        <input
          value={signinInfo.password}
          placeholder="password"
          onChange={(e) => setSigninInfo({ ...signinInfo, password: e.target.value })}
        />
        <input
          value={signinInfo.username}
          placeholder="username"
          onChange={(e) => setSigninInfo({ ...signinInfo, username: e.target.value })}
        />
        <input type="button" onClick={onSubmit} />
        <input type="button" onClick={onEmail} />
      </form>
    </div>
  );
}

export default Signin;
