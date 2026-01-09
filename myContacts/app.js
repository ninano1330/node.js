const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Hello, Node!');
});

app.get('/contacts', (req, res) => {
    res.send('Contacts Page');
});

app.get('/contacts/:id', (req, res) => {
    res.send(`View Contact for ID : ${req.params.id}`);
});

app.post('/contacts', (req, res) => {
    res.send('Create Contacts');
});

app.put('/contacts/:id', (req, res) => {
    res.send(`update Contact for ID : ${req.params.id}`);
});

app.delete('/contacts/:id', (req, res) => {
    res.send(`delete Contact for ID : ${req.params.id}`);
});

app.listen(3000, () => {
    console.log('서버 실행 중');
});