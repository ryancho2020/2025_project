var express = require('express');
var router = express.Router();
router.post('/', (req, res) => {
    var id = req.body.id;
    var pwd = req.body.pwd;
    var title = 'Post page';
    console.log("id : ", id);
    console.log("pwd : ", pwd);
    res.send(
        `<h1>${title}</h1>
        <p>당신의 아이디는 : ${id}</p>
        <p>당신의 비밀번호는 : ${pwd}</p>`
    )
});
module.exports = router;