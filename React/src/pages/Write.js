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

  // 글쓰기 완료 버튼 클릭 시 실행되는 함수
  const handleSubmit = () => {
    if (!title || !content) {
      alert("제목과 내용을 모두 입력해주세요!");
      return;
    }

    // 여기에 글쓰기 완료 후 서버로 POST 요청 보내는 로직 추가 가능
    console.log("제목:", title);
    console.log("내용:", content);
    alert("글이 작성되었습니다!");

    // 글 작성 후 입력값 초기화
    setTitle('');
    setContent('');
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

      {/* 글쓰기 완료 버튼 */}
      <div>
        <button
          onClick={handleSubmit}
          style={{
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '10px 20px',
            fontSize: '16px',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            width: '100%',
          }}
        >
          글쓰기 완료
        </button>
      </div>
    </main>
  );
}

export default Write;
