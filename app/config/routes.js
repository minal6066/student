const mongoose = require('mongoose');
const student = require('../controllers/app');

module.exports = function (app) {
    app.get('/hello', (req, res) => {
        res.send("Hello World!!!")
    } )
    app.post('/addStudent', student.addCandidate);
    app.patch('/addScore', student.addScore);
    app.get('/average', student.calculateAverage);
}