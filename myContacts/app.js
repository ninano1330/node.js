const express = require('express');
const dbConnect = require('./config/dbConnect');
const methodOverride = require('method-override');

const app = express();
dbConnect();

app.set('view engine', 'ejs');
app.set('views', './views');

app.use(express.static('./public'));
app.use(methodOverride('_method'));

app.use(express.json());
app.use(express.urlencoded({ extended : true }));

app.use('/', require('./routes/loginRoutes'));
app.use('/contacts', require('./routes/contactRoutes')); // router 미들웨어 사용

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

app.listen(3000, () => {
    console.log('서버 실행 중');
});