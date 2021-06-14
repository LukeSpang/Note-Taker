const express = require('express');
const path = require('path');
const fs = require('fs');

let app = express();
let PORT = process.env.PORT || 3000;

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static("public"));
let notes = require("./db/db.json");