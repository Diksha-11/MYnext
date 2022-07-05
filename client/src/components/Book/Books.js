import React, { useEffect, useState } from "react";
import axios from 'axios';
import Book from "./Book";
import "./Book.css";

import { Box } from "@mui/material";


const URL = "http://localhost:5000/books";

const fetchHandler = async() =>{

   return  await axios.get(URL).then((res)=>res.data);
};


const Books = () => {
    const [books,setBooks]= useState();

    useEffect(()=>{
       fetchHandler().then((data)=>setBooks(data.books));
    },[] );
    console.log(books);
    return <Box sx={{backgroundColor:"#f8f4f4"}}>  
        <ul>
            {books && books.map((book,i)=>(
                <li className="book" key={i}>
                     <Book book={book}/>
                </li>
            ))}
        </ul>
    </Box>
  };
  
  export default Books;




/*import React, { useEffect, useState } from "react";
import axios from 'axios';
import Book from "./Book";
import "./Book.css";
import bg from './bg.webp';
import { Box } from "@mui/material";


const URL = "http://localhost:5000/books";

const fetchHandler = async() =>{

   return  await axios.get(URL).then((res)=>res.data);
};

const Books = () => {
    const [books,setBooks]= useState();

    useEffect(()=>{
       fetchHandler().then((data)=>setBooks(data.books));
    },[] );
    console.log(books);
    return <Box sx={{backgroundColor:"#f8f4f4"}}>  
        <ul>
            {books && books.map((book,i)=>(
                <li className="book" key={i}>
                     <Book book={book}/>
                </li>
            ))}
        </ul>
    </Box>
  };
  
  export default Books;*/