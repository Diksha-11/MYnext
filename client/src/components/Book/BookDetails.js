import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, FormLabel, TextField } from '@mui/material';
import { Box } from "@mui/system";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { useNavigate } from 'react-router-dom';


const BookDetails = () => {

   const [userData, setUserData] = useState({name:"", email:""});

    const history = useNavigate();
    const [inputs, setInputs] = useState({});
    const id = useParams().id;
    const [Checked, setChecked] = useState(false);

    const userWishlist = async () => {
        try {
            const res = await fetch('/getdata', {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                },
            });
            const data = await res.json();
            console.log(data);
            setUserData({...userData, name:data.name, email:data.email} );

            if (!res.status === 200) {
                const error = new Error(res.error);
                throw error;
            }
        }catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        userWishlist();
    }, []);

   const  handleInput  = (e) =>{
         
   }

    useEffect(() => {
        const fetchHandler = async () => {
            await axios
                .get(`http://localhost:5000/books/${id}`)
                .then((res) => res.data).then(data => setInputs(data.book));
        };
        fetchHandler()//.then((data)=>setInputs(data.book));
    }, [id]);

    const sendRequest = async () => {
        await axios.put(`http://localhost:5000/books/${id}`, {
            name: String(inputs.name),
            author: String(inputs.author),
            description: String(inputs.description),
            price: Number(inputs.price),
            image: String(inputs.image),
            available: Boolean(Checked),
        }).then(res => res.data);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest().then(() => history("/books"));
    };


    const handleChange = (e) => {
        setInputs((prevState) => (
            {
                ...prevState,
                [e.target.name]: e.target.value
            }
        ))

         const name = e.target.name;
         const value = e.target.value;

         setUserData({...userData, name:userData.name, email:userData.email}  );
    };


    return <div  >
        {inputs && <form onSubmit={handleSubmit}>
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                maxWidth={600}
                alignContent={"center"}
                alignSelf="center"
                marginLeft={"auto"}
                marginRight={"auto"}
                marginTop={7}>

                <FormLabel>Name</FormLabel>
                <TextField
                    value={inputs.name}
                    onChange={handleChange}
                    type="String"
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    name="name" />

                <FormLabel>Author</FormLabel>
                <TextField
                    value={inputs.author}
                    onChange={handleChange}
                    type="String"
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    name="author" />

                <FormLabel>Description</FormLabel>
                <TextField
                    value={inputs.description}
                    onChange={handleChange}
                    type=""
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    name="description" />

                <FormLabel>Price</FormLabel>
                <TextField
                    value={inputs.price}
                    onChange={handleChange}
                    type="number"
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    name="price" />


                <FormLabel>Image</FormLabel>
                <TextField
                    value={inputs.image}
                    onChange={handleChange}
                    margin="normal"
                    fullWidth
                    variant="outlined"
                    name="image" />

                

                <FormControlLabel control={<Checkbox Checked={Checked} />} onChange={() => setChecked(!Checked)} label="Available" />
                <Button variant="contained" type="submit">Update Item</Button>
            </Box>
        </form>

        } </div>
}

export default BookDetails;










//in userRoutes
/*

router.get('/getdata', authenticate, (req, res) => {
    console.log("I am getdata");
    res.send(req.rootUser);
})


*/







/*import React ,{useEffect, useState}from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {Button, FormLabel, TextField} from '@mui/material';
import { Box } from "@mui/system";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {useNavigate} from 'react-router-dom';


const BookDetails = () => {
    const history = useNavigate();
    const [inputs, setInputs] = useState({});
    const id = useParams().id;
    const [Checked, setChecked] = useState(false);

    useEffect(() => {
        const fetchHandler = async () => {
            await axios
             .get(`http://localhost:5000/books/${id}`)
             .then((res) => res.data).then(data=>setInputs(data.book));
        };
        fetchHandler()//.then((data)=>setInputs(data.book));
    }, [id]);

    const sendRequest = async()=>{
      await axios.put(`http://localhost:5000/books/${id}` , {
        name:String(inputs.name),
        author:String(inputs.author),
        description:String(inputs.description),
        price:Number(inputs.price),
        image:String(inputs.image),
        available:Boolean(Checked),
      }).then(res => res.data);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        sendRequest().then(()=>history("/books"));
   };
   
   
   const handleChange = (e) => {
    setInputs((prevState) => (
        {
            ...prevState,
            [e.target.name]: e.target.value
       }
    ))
    };


    return <div  >
      {inputs && <form onSubmit={handleSubmit}>
        <Box 
          display="flex" 
          flexDirection="column" 
          justifyContent="center" 
          maxWidth={600}
          alignContent={"center"}
          alignSelf="center"
          marginLeft={"auto"}
          marginRight={"auto"}
          marginTop={7}>

        <FormLabel>Name</FormLabel>
        <TextField 
           value={inputs.name}
           onChange={handleChange}
           type="String"
           margin="normal" 
           fullWidth 
           variant="outlined" 
           name="name" />

        <FormLabel>Author</FormLabel>
        <TextField 
           value={inputs.author}
           onChange={handleChange}
           type="String"
           margin="normal" 
           fullWidth 
           variant="outlined" 
           name="author" />

        <FormLabel>Description</FormLabel>
        <TextField 
              value={inputs.description}
              onChange={handleChange}
            type=""
            margin="normal" 
            fullWidth 
            variant="outlined" 
            name="description" />

        <FormLabel>Price</FormLabel>
        <TextField 
            value={inputs.price}
            onChange={handleChange}
            type="number" 
            margin="normal" 
            fullWidth 
            variant="outlined" 
            name="price" />
        
        
        <FormLabel>Image</FormLabel>
        <TextField 
            value={inputs.image}
            onChange={handleChange}
            margin="normal" 
            fullWidth 
            variant="outlined" 
            name="image" />

        <FormControlLabel control={<Checkbox Checked={Checked} />} onChange={()=>setChecked(!Checked)} label="Available" />
        <Button variant="contained" type="submit">Update Item</Button>
        </Box>
    </form>
     
 } </div>
  }
  
  export default BookDetails;*/