const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const event_router = require('./routes/event_routes')
const port = 5000;
const app = express();
app.use(express.json());
app.use(bodyparser.json());

mongoose.connect("mongodb+srv://contact:manager@cluster0.zijr4xf.mongodb.net/?retryWrites=true&w=majority").then(() => console.log('Connected to db'))
app.use("/", event_router)
app.listen(port, ()=>{
    console.log(`port is on ${port}`);
})