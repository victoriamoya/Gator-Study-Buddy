const express = require('express')
const app = express();

app.set('view-engine', 'ejs')

app.get('/', (req, res) => {
    res.render('index.ejs', {username: 'Bryan'})
})

app.get('/register', (req, res) => {
    res.render('register.ejs')
})

app.get('/login', (req, res) => {
    res.render('login.ejs')
})

app.post('/register', (req, res) => {
    res.render('register.ejs')
})

app.listen(5000) // localhost:5000
// port 5000 for backend
// port 3000 for frontend

app.get('/express_backend', (req, res) => {
    res.send({ express: 'YOUR EXPRESS BACKEND IS CONNECTED TO REACT' });
});
