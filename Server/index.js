const express = require('express');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

const app = express();
const port = 8080;

// JWT 비밀 키
const ACCESS_SECRET_KEY = 'your-access-secret-key';

// JWT 토큰 인증 미들웨어
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]; // Bearer 토큰 가져오기
  if (!token) return res.status(401).json({ message: '토큰이 필요합니다.' });

  jwt.verify(token, ACCESS_SECRET_KEY, (err, user) => {  // 비밀 키를 ACCESS_SECRET_KEY로 수정
    if (err) return res.status(403).json({ message: '유효하지 않은 토큰입니다.' });
    req.user = user;  // 사용자 정보 저장
    next();
  });
}


// CORS 및 JSON 파싱 설정
app.use(express.json());
app.use(require('cors')({ origin: 'http://localhost:3000', credentials: true }));

// MySQL 연결 설정
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'mysql',
});

// MySQL 연결 확인
db.connect((err) => {
  if (err) {
    console.error('MySQL 연결 실패:', err);
    return;
  }
  console.log('MySQL 연결 성공');
});

// 로그인 엔드포인트
app.post('/login', (req, res) => {
  const { id, password } = req.body;

  if (!id || !password) {
    return res.status(400).json({ error: 'ID와 비밀번호는 필수입니다.' });
  }

  const query = 'SELECT * FROM users WHERE id = ? AND password = ?';

  db.query(query, [id, password], (err, results) => {
    if (err) {
      console.error('DB 오류:', err);
      return res.status(500).json({ error: '서버 오류' });
    }

    if (results.length > 0) {
      const user = results[0];

      // Access Token 생성 (여기서 이메일도 추가)
      const accessToken = jwt.sign(
        { id: user.id, name: user.name, email: user.email },  // 이메일 추가
        ACCESS_SECRET_KEY,
        { expiresIn: '1h' }
      );

      // 로그인 성공 시 토큰을 클라이언트에 반환
      res.status(200).json({
        success: true,
        message: '로그인 성공',
        token: accessToken, // 클라이언트에서 사용할 토큰 반환
      });
    } else {
      res.status(401).json({ success: false, message: '아이디 또는 비밀번호가 잘못되었습니다.' });
    }
  });
});

// MYPAGE 엔드포인트
app.get('/mypage', authenticateToken, (req, res) => {
  // req.user는 JWT에서 복호화된 사용자 정보입니다
  const user = {
    name: req.user.name,
    email: req.user.email,  // 이메일이 토큰에 포함되었으므로 바로 사용할 수 있습니다.
  };

  // 사용자 정보를 반환
  res.json({ success: true, user });
});


// POSTS 엔드포인트 (로그인 없이 접근 가능)
app.get('/posts', (req, res) => {
  const query = 'SELECT posts.posts_id, posts.title, users.id AS user_id, posts.time FROM posts JOIN users ON posts.user_id = users.user_id';


  db.query(query, (err, results) => {
    if (err) {
      console.error('DB 오류:', err);
      return res.status(500).json({ error: '서버 오류' });
    }

    // 데이터 반환
    res.status(200).json({
      success: true,
      posts: results,
    });
  });
});


//글내용
app.get("/posts/:id", (req, res) => {
  const postId = req.params.id;

  // content만 가져오는 쿼리
  const sql = "SELECT content FROM posts WHERE posts_id = ?";

  // posts와 users 테이블을 JOIN하여 필요한 데이터를 가져오는 쿼리
  const query = 'SELECT posts.posts_id, posts.title, users.id AS user_id, posts.time, posts.content, posts.likes FROM posts JOIN users ON posts.user_id = users.user_id WHERE posts.posts_id = ?';

  db.query(query, [postId], (err, result) => {
    if (err) {
      console.error('DB 오류:', err);
      return res.status(500).json({ message: "서버 오류", error: err });
    }

    // 결과가 없다면 404 반환
    if (result.length === 0) {
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    }

    // 쿼리에서 가져온 내용 반환
    res.status(200).json({
      success: true,
      post: result[0], // 게시글 정보
    });
  });
});



// 서버 시작
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
