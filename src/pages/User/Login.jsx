import React, { useState } from 'react';
import axios from 'axios';

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: '',
    username: '',
  });
  const onSubmit = async () => {
    const isLogin = await axios.post(
      'http://localhost:3001/users/login',
      { username: loginInfo.username, password: loginInfo.password },
    ).then((e) => {
      console.log(e);
    });
    console.log(isLogin.data);
  };
  return (
    <div>
      <form>
        <input
          value={loginInfo.email}
          placeholder="email"
          onChange={(e) => setLoginInfo({ ...loginInfo, email: e.target.value })}
        />
        <input
          value={loginInfo.password}
          placeholder="password"
          onChange={(e) => setLoginInfo({ ...loginInfo, password: e.target.value })}
        />
        <input
          value={loginInfo.username}
          placeholder="username"
          onChange={(e) => setLoginInfo({ ...loginInfo, username: e.target.value })}
        />
        <input type="button" onClick={onSubmit} />
      </form>
    </div>
  );
}

export default Login;
