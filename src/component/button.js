import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { isAuthenticated, logout } from './auth';  // 로그인 상태를 확인하고 로그아웃 함수 사용

// 홈 버튼
export const HomeButton = () => (
  <Link to="/"><button>홈</button></Link>
);

// 회원가입 버튼
export const SignupButton = () => (
  <Link to="/signup"><button>회원가입</button></Link>
);

// 로그인 버튼
export const LoginButton = () => (
  <Link to="/login"><button>로그인</button></Link>
);

// About 페이지 버튼
export const AboutButton = () => (
  <Link to="/about"><button>About</button></Link>
);

// 로그아웃 버튼
export const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();  // 로그아웃 처리
    navigate('/login');  // 로그인 페이지로 리디렉션
  };

  return (
    <button onClick={handleLogout}>로그아웃</button>
  );
};

// 게시판 페이지 버튼
export const BoardButton = () => (
  <Link to="/board"><button>게시판</button></Link>
);

// 글쓰기 페이지 버튼
export const WriteButton = () => (
  <Link to="/Write"><button>글쓰기</button></Link>
);

