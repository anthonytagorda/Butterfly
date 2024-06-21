// Client Main Class
const express = require('express');
const path = require('path');

const client = express();

const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

client.use(express.json());
