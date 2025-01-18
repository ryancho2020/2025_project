import axios from 'axios';

// 로그인 함수
async function login(id, password) {
  const url = 'http://localhost:8080/login'; // 로그인 요청을 보낼 서버의 URL

  try {
    // 서버에 로그인 요청 보내기
    const response = await axios.post(url, { id, password });

    if (response.data.success && response.data.token) {
      // 로그인 성공 시 토큰을 localStorage에 저장
      localStorage.setItem('authToken', response.data.token);
      return { success: true, message: '로그인 성공' };
    } else {
      // 로그인 실패 시
      return { success: false, message: response.data.message || '아이디 또는 비밀번호가 잘못되었습니다.' };
    }
  } catch (error) {
    // 에러 처리
    if (error.response) {
      // 서버에서 응답이 있을 경우
      return { success: false, message: error.response.data.message || '알 수 없는 오류' };
    } else if (error.request) {
      // 서버로 요청을 보냈으나 응답이 없는 경우
      return { success: false, message: '서버 응답이 없습니다. 네트워크를 확인해주세요.' };
    } else {
      // 요청을 설정하는 중에 발생한 에러
      return { success: false, message: '로그인 요청을 처리하는 중에 오류가 발생했습니다.' };
    }
  }
}

// 로그인 상태 확인 함수
function isAuthenticated() {
  const token = localStorage.getItem('authToken');
  return token ? true : false; // 토큰이 있으면 로그인 상태
}

// 로그아웃 함수
function logout() {
  localStorage.removeItem('authToken');
}

export { login, isAuthenticated, logout };
