const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
dotenv.config();

const cors = require('cors');
const app = express();

mongoose.connect(process.env.MONGO_DB, {useNewUrlParser: true, useUnifiedTopology: true}, err => {
    if (!err) return console.log('Connected to DB');
    console.log(err);
})

const PORT = process.env.PORT || 5000;

app.use(express.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(cookieParser());
app.use(cors());

// Routes
app.use('/auth', require('./Controllers/Routes/auth'));
app.use('/bugs', require('./Controllers/Routes/bug'));

// Serve client
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/build")));
  
    app.get("*", (req, res) =>
      res.sendFile(
        path.resolve(__dirname, "../", "frontend", "build", "index.html")
      )
    );
  } else {
      app.get('/', (req, res) => res.send('Please set to production'))
  }

app.listen(PORT, () => {
    console.log('listening on ' + PORT)
})