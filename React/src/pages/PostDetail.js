import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode"; // jwt-decode 패키지에서 jwtDecode 함수를 가져옵니다.

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    // 로컬스토리지에서 토큰을 가져옵니다.
    const token = localStorage.getItem("authToken");

    if (token) {
      try {
        // JWT 디코딩을 통해 user_id 추출
        const decodedToken = jwtDecode(token);  // jwtDecode 함수 사용
        setUserId(decodedToken.id); // user_id를 상태에 설정
      } catch (error) {
        console.error("토큰 디코딩 오류:", error);
      }
    }

    // 서버로부터 게시글 데이터를 가져옵니다.
    axios.get(`http://localhost:8080/posts/${id}`)
      .then((res) => {
        setPost(res.data.post); // 반환된 게시글 데이터를 상태에 저장
      })
      .catch((err) => {
        setError(err.message); // 오류 처리
      })
      .finally(() => {
        setLoading(false); // 로딩 상태 종료
      });
  }, [id]); // id가 변경될 때마다 다시 요청

  const handleLike = async () => {
    if (!userId) {
      alert("로그인 후 좋아요를 눌러주세요.");
      return;
    }

    const token = localStorage.getItem("authToken"); // JWT 토큰을 로컬스토리지에서 가져옵니다.

    try {
      // 좋아요를 눌렀을 때 서버에 요청 보내기
      const response = await axios.post(
        "http://localhost:8080/likes", 
        { user_id: userId, post_id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`, // JWT 토큰을 Authorization 헤더에 추가
          }
        }
      );

      // 서버에서 좋아요 업데이트 후 최신 데이터를 받기
      setPost(response.data.post); // 서버 응답으로 받은 최신 게시글 데이터를 로컬 상태에 반영
      alert(response.data.message); // 서버에서 반환한 메시지
    } catch (error) {
      console.error("좋아요 실패:", error);
      alert(error.response?.data?.message || "좋아요를 실패했습니다.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!post) return <p>게시글을 찾을 수 없습니다.</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p><strong>작성자 ID:</strong> {post.user_id}</p>
      <p><strong>작성 시간:</strong> {new Date(post.time).toLocaleString()}</p>
      <p><strong>내용:</strong> {post.content}</p>
      <p>
        <strong>좋아요:</strong> {post.likes} ❤️
        <button onClick={handleLike}>좋아요</button>
      </p>
    </div>
  );
}

export default PostDetail;
