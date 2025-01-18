import React from 'react';
import { Link } from 'react-router-dom';
import Posts from './Posts'; // Posts 컴포넌트를 임포트

function Board() {
  return (
    <main>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>글 목록</h2>
        <Link to="/write">
          <button style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}>
            글쓰기
          </button>
        </Link>
      </div>

      {/* 글 목록을 보여주는 Posts 컴포넌트 */}
      <Posts />
    </main>
  );
}

export default Board;
