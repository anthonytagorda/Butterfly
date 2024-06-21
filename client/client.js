// client.js 
const express = require('express');
const path = require('path');

const client = express();

const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

// Parse JSON bodies (as sent by API clients)
client.use(express.json());

// Session
client.use(session ({
    name: 'UserSessionID',
    secret: process.env.JWT_SECRET,
    cookie: { maxAge: parseInt(process.env.JWT_EXPIRES_IN)},
    saveUninitialized: false
}))

// View Engine (EJS)
client.set('view-engine', 'ejs')

// Retrieve Assets
const publicDir = path.join(__dirname, './public');
client.use(express.static(publicDir));

// Define Routes
client.use('/', require('./routes/pages'));
client.use('/auth', require('./routes/auth'))

// Port
const port = process.env.PORT;
client.listen(port, () => {
    console.console.log(`Server started at port ${port}`);
})
