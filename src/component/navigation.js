import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { isAuthenticated, logout } from '../component/auth'; // 로그인 상태 확인 및 로그아웃 함수

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 위치를 가져옵니다
  const authenticated = isAuthenticated(); // 로그인 상태 확인

  const handleLogout = () => {
    logout(); // 로그아웃 처리
    navigate('/login'); // 로그아웃 후 로그인 페이지로 이동
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-around', padding: '10px', backgroundColor: '#f8f9fa' }}>
      <Link to="/">홈</Link>
      <Link to="/board">게시판</Link> {/* 게시판 버튼 */}
      <Link to="/about">소개</Link> {/* 소개 버튼은 항상 보이도록 수정 */}

      {authenticated ? (
        <>
          <button onClick={handleLogout}>로그아웃</button>
          <Link to="/mypage">마이페이지</Link>
        </>
      ) : (
        <>
          <Link to="/signup">회원가입</Link>
          <Link to="/login">로그인</Link>
        </>
      )}
    </nav>
  );
};

export default Navigation;
