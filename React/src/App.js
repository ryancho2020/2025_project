import React from 'react';
import { Routes, Route } from 'react-router-dom'; // BrowserRouter 제거
import Home from './pages/Home';
import Signup from './pages/Signup';
import LoginPage from './pages/LoginPage';
import AboutPage from './pages/AboutPage';
import MyPage from './pages/MyPage';
import Board from './pages/Board';
import Write from './pages/Write';
import Navigation from './component/navigation';
import PostDetail from './pages/PostDetail';

function App() {
  return (
    <div>
      <Navigation /> {/* 네비게이션 바 */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/board" element={<Board />} />
        <Route path="/write" element={<Write />} />
        <Route path="/post/:id" element={<PostDetail />} />
      </Routes>
    </div>
  );
}

export default App;
