const express = require("express");

const app = express();

app.use('/' ,(req, res, next)=>{
    console.log('This always run first');
    next();
})

app.use('/add-product' ,(req, res, next)=>{
    console.log('In product middleware');
    res.send('<h1>Hello from "Product page"</h1>');
})

app.use('/' ,(req, res, next)=>{
    console.log('In another middleware');
    res.send('<h1>Hello from  Express.js</h1>');
})

app.listen(3000)
