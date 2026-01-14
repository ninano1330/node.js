const express = require('express');
const dbConnect = require('./config/dbConnect');

const app = express();
dbConnect();

app.get('/', (req, res) => {
    res.send('Hello, Node!');
});

app.use(express.json());
app.use(express.urlencoded({ extended : true }));

// app.get('/contacts', (req, res) => {
//     res.send('Contacts Page');
// });

// app.post('/contacts', (req, res) => {
//     res.send('Create Contacts');
// });

// app.get('/contacts/:id', (req, res) => {
//     res.send(`View Contact for ID : ${req.params.id}`);
// });

// app.put('/contacts/:id', (req, res) => {
//     res.send(`update Contact for ID : ${req.params.id}`);
// });

// app.delete('/contacts/:id', (req, res) => {
//     res.send(`delete Contact for ID : ${req.params.id}`);
// });

app.use('/contacts', require('./routes/contactRoutes')); // router 미들웨어 사용

app.listen(3000, () => {
    console.log('서버 실행 중');
});