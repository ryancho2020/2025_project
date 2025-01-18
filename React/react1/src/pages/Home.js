import React from 'react';
import { isAuthenticated } from '../component/auth';  // isAuthenticated, logout 함수 불러오기

const Home = () => {

  // 로그인 상태 확인
  const authenticated = isAuthenticated();

  return (
    <div>
      <h2>홈페이지</h2>
      {authenticated ? (
        <div>
          <p>환영합니다! 로그인된 상태입니다.</p>
        </div>
      ) : (
        <div>
          <p>로그인되지 않은 상태입니다.</p>
        </div>
      )}
    </div>
  );
};

export default Home;
