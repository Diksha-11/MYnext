const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/book-routes");
const cookieParser = require('cookie-parser')
const cors = require("cors");
const app = express();

app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use("/books", router); //localhost will be :- localhost://5000/books

dotenv.config({ path: './config.env'});
//const DB = 'mongodb+srv://admin:dik123@cluster0.pqvli.mongodb.net/Book-Store?retryWrites=true&w=majority';
const DB = process.env.DATABASE;
//const User = require('./model/userModel');

mongoose.connect(DB).then(() =>{//.DB/conn 
    console.log(`Connected to database`);
    }).catch((err) =>console.log(err));

app.use(express.json());   
app.use(require("./routes/userRoutes"));
const PORT = process.env.PORT;


app.get('/',(req, res) => {
    res.send(`hii im home`);
})

app.get('/books',(req, res) => {
    res.cookie("Test", 'diksha');
    res.send(`wishlist shows here`);
})

app.get('/signin',(req, res) => {
    res.send(`add your items here`);
})

app.get('/signup',(req, res) => {
    res.send(`wishlist shows here`);
})

app.listen(PORT, () => {
    console.log(`server is running at 5000`);
})

/*
app.use(express.json());
app.use(cors());
app.use("/books", router); //localhost will be :- localhost://5000/books
//app.use("/register", router); 

mongoose.connect("mongodb+srv://admin:dik123@cluster0.pqvli.mongodb.net/Book-Store?retryWrites=true&w=majority", {
    user
}).then(() =>{
    console.log("Connected to database");
    }).catch((err) =>console.log(err));

// password:  dik123
*/
