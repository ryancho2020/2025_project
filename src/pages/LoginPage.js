import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';  // useNavigate 훅을 import
import { login } from '../component/auth';  // auth.js에서 login 함수 불러오기
import '../style/LoginPage.css';

const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // useNavigate 훅으로 리디렉션을 위한 함수 생성

  // 로그인 처리
  const handleLogin = async (e) => {
    e.preventDefault();  // 기본 폼 제출 동작 방지

    // auth.js의 login 함수 호출
    const result = await login(id, password);

    // 로그인 성공 여부에 따른 메시지 처리
    if (result.success) {
      setMessage(result.message);  // '로그인 성공'
      
      // 로그인 성공 후 홈페이지로 리디렉션 (메시지와 함께)
      setTimeout(() => {
        navigate('/'); // '/'로 리디렉션 (홈페이지로 돌아감)
      }, 1000); // 1초 후 리디렉션
    } else {
      setMessage(result.message);  // 로그인 실패 메시지 표시
    }
  };

  return (
    <div className="login-container">
      <h2>로그인</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>아이디:</label>
          <input
            type="text"
            placeholder="아이디"
            value={id}
            onChange={(e) => setId(e.target.value)}
          />
        </div>
        <div>
          <label>패스워드:</label>
          <input
            type="password"
            placeholder="패스워드"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">로그인</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default LoginPage;
