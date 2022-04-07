const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const cors = require('cors');
const app = express();

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true}, err => {
    if (!err) return console.log('Connected to DB');
    console.log(err);
})

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({extended: true}))
app.use(cookieParser());
app.use(cors());

// Routes
app.use('/auth', require('./Controllers/Routes/auth'));
app.use('/bugs', require('./Controllers/Routes/bug'));

app.listen(PORT, () => {
    console.log('listening on ' + PORT)
})