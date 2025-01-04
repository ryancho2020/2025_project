import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MyPage() {
  const [userInfo, setUserInfo] = useState(null); // 유저 정보 상태
  const [error, setError] = useState(null); // 에러 상태

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const token = localStorage.getItem('authToken'); // 토큰 가져오기

        // 토큰이 없으면 에러 메시지 출력
        if (!token) {
          console.log("토큰이 없습니다.");  // 로그 추가
          setError('로그인이 필요합니다.');
          return;
        }

        console.log("토큰을 가지고 요청을 보냅니다:", token);  // 로그 추가

        // 서버로 토큰을 보내 사용자 정보 요청 (URL 수정)
        const response = await axios.get('http://localhost:8080/mypage', {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("서버 응답:", response);  // 로그 추가

        if (response.data.success) {
          setUserInfo(response.data.user); // 유저 정보 저장
        } else {
          console.log("서버에서 유저 정보 가져오기 실패:", response.data.message);  // 로그 추가
          setError(response.data.message || '유저 정보를 가져오지 못했습니다.');
        }
      } catch (err) {
        console.error("서버 요청 중 오류:", err);  // 로그 추가
        setError('서버 요청 중 오류가 발생했습니다.');
      }
    };

    fetchUserInfo();
  }, []);

  return (
    <main>
      <h2>마이페이지</h2>
      {error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : userInfo ? (
        <div>
          <p><strong>이름:</strong> {userInfo.name}</p>
          <p><strong>이메일:</strong> {userInfo.email}</p>
        </div>
      ) : (
        <p>정보를 불러오는 중...</p>
      )}
    </main>
  );
}

export default MyPage;
