const express = require('express');
const router = express.Router();

router.route('/')
.get((req, res) => {
    res.send('Contacts Page');
})
.post((req, res) => {
    const { name, email, phone } = req.body;
    if(!name || !email || !phone) {
        return res.send('필수 값이 입력되지 않았습니다.');
    }

    res.send('Create Contacts');
});

router.route('/:id')
.get((req, res) => {
    res.send(`View Contact for ID : ${req.params.id}`);
})
.put((req, res) => {
    res.send(`update Contact for ID : ${req.params.id}`);
})
.delete((req, res) => {
    res.send(`delete Contact for ID : ${req.params.id}`);
});

module.exports = router;