const route = require('express').Router();
const userModel = require('../../Models/userModel');

// Create user
route.post('/user', (req, res) => {
    userModel.create(req.body).then((user) => {
        if (!user) return res.status(400).send('There was an error');
        res.send('Created user');
    })
    .catch(err => res.status(400).send(err))
})

// Update user
route.put('/user', (req, res) => {
    const { _id, name, password, role } = req.body
    userModel.findByIdAndUpdate(_id, { name, password, role }).then(user => {
        if (!user) return res.status(400).send('No user');
        res.send('Updated user');
    })
    .catch(err => {
        if (err) res.status(400).send(err);
    })
})

// Login user
.post('/', (req, res) => {
    userModel.findOne(req.body).then(user => {
        if (!user) return res.status(400).send('Incorrect email or password');
        res.cookie('user', user);
        res.send(true);
    })
    .catch(err => {
        if (err) res.status(400).send(err);
    })
})

// Get users
.get('/', (req, res) => {
    userModel.find().then(user => {
        if (!user) return res.status(400).send('No users');
        res.send(user);
    })
    .catch(err => {
        if (err) res.status(400).send(err);
    })
})

module.exports = route;