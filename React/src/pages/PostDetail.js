import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!post) return <p>게시글을 찾을 수 없습니다.</p>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p><strong>작성자 ID:</strong> {post.user_id}</p>
      <p><strong>작성 시간:</strong> {new Date(post.time).toLocaleString()}</p>
      <p><strong>내용:</strong> {post.content}</p>
      <p><strong><button>좋아요:</button></strong> {post.likes} ❤️</p>
    </div>
  );
}

export default PostDetail;
