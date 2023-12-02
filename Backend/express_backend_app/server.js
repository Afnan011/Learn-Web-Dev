const express = require('express')
const mongoose = require('mongoose')

const app = express()

const url = `mongodb+srv://afnan011:Afnan%40123@cluster0.7jypref.mongodb.net/?retryWrites=true&w=majority`;


mongoose.connect(url, {useNewUrlParser:true})
const con = mongoose.connection;

con.on('open', () => {
    console.log("Connected");
    console.log();
})