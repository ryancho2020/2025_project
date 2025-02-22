import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Write() {
  const [title, setTitle] = useState(""); // 제목 상태
  const [content, setContent] = useState(""); // 내용 상태
  const navigate = useNavigate(); // 페이지 이동을 위한 Hook

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  const handleSubmit = async () => {
    if (!title || !content) {
      alert("제목과 내용을 모두 입력해주세요!");
      return;
    }

    const token = localStorage.getItem("authToken"); // JWT 토큰 가져오기
    if (!token) {
      alert("로그인 후 글을 작성해주세요.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/posts",
        { title, content },
        {
          headers: { Authorization: `Bearer ${token}` }, // JWT 인증 추가
        }
      );

      alert("글이 작성되었습니다!");
      navigate("/board"); // 게시판 페이지로 이동
    } catch (error) {
      console.error("글 작성 오류:", error);
      alert(error.response?.data?.message || "서버 오류가 발생했습니다.");
    }
  };

  return (
    <main>
      <h2>글 작성</h2>

      {/* 제목 입력 */}
      <div>
        <label htmlFor="title" style={{ fontSize: "18px", fontWeight: "bold" }}>
          제목
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          placeholder="글의 제목을 입력하세요."
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            marginBottom: "20px",
            borderRadius: "5px",
            border: "1px solid #ccc",
          }}
        />
      </div>

      {/* 내용 입력 */}
      <div>
        <label
          htmlFor="content"
          style={{ fontSize: "18px", fontWeight: "bold" }}
        >
          내용
        </label>
        <textarea
          id="content"
          value={content}
          onChange={handleContentChange}
          placeholder="여기에 글을 작성하세요."
          style={{
            width: "100%",
            height: "300px",
            padding: "10px",
            fontSize: "16px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            resize: "vertical",
          }}
        />
      </div>

      {/* 글쓰기 완료 버튼 */}
      <div>
        <button
          onClick={handleSubmit}
          style={{
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "10px 20px",
            fontSize: "16px",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            width: "100%",
          }}
        >
          글쓰기 완료
        </button>
      </div>
    </main>
  );
}

export default Write;
