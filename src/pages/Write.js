import React, { useState } from 'react';

function Write() {
  const [title, setTitle] = useState('');  // 제목 상태 관리
  const [content, setContent] = useState('');  // 글 내용 상태 관리

  const handleTitleChange = (e) => {
    setTitle(e.target.value);  // 제목 입력값 상태 업데이트
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);  // 내용 입력값 상태 업데이트
  };

  return (
    <main>
      <h2>글 작성</h2>

      {/* 제목 입력란 */}
      <div>
        <label htmlFor="title" style={{ fontSize: '18px', fontWeight: 'bold' }}>
          제목
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          placeholder="글의 제목을 입력하세요."
          style={{
            width: '100%',
            padding: '10px',
            fontSize: '16px',
            marginBottom: '20px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
      </div>

      {/* 내용 입력란 */}
      <div>
        <label htmlFor="content" style={{ fontSize: '18px', fontWeight: 'bold' }}>
          내용
        </label>
        <textarea
          id="content"
          value={content}
          onChange={handleContentChange}
          placeholder="여기에 글을 작성하세요."
          style={{
            width: '100%',
            height: '300px',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            resize: 'vertical', // 세로 방향으로만 크기 조절 가능
          }}
        />
      </div>
    </main>
  );
}

export default Write;
