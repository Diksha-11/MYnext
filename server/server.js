const express = require("express");

const  Book = require('./model/Book');

const app = express();
const App = require("./app.js")
app.use(express.json());

const bookRoutes = require('./routes/book-routes')
const userRoute = require('./routes/userRoutes')

app.use('/api/books/' , bookRoutes)
app.use('/api/user/' , userRoute)

app.get("/", (req,res) => {
    res.send("server is working!"+ port);
});