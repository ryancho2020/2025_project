import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log('글 정보 요청 보냄');

    // 서버로부터 데이터 가져오기
    axios
      .get('http://localhost:8080/posts') // API 요청
      .then((response) => {
        setPosts(response.data.posts); // 서버에서 반환된 데이터를 상태에 저장
        console.log(response.data.posts);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }, []);

  return (
    <section>
      {posts.length > 0 ? (
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {posts.map((post, index) => (
            <li
              key={index}
              style={{
                padding: '10px',
                borderBottom: '1px solid #ccc',
              }}
            >
              <Link to={`/post/${post.posts_id}`}><button>{post.title}</button></Link>
              <p>글쓴이: {post.user_id}</p>
              <p>날짜: {new Date(post.time).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>글이 없습니다.</p>
      )}
    </section>
  );
}

export default Posts;
