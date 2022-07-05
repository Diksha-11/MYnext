import React, { useState , useEffect} from "react";
import {Button, FormLabel, TextField} from '@mui/material';
import { Box } from "@mui/system";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';

const AddBook = () => {
    const history = useNavigate();
    const  [ userData , setUserData] = useState();

    const callAddpage = async() => {
        try{
            const res = await fetch('/add', {
                 method: "GET",
                 headers: {
                     Accept: "application/json",
                     "Content-Type":"application/json"
                 },
                 credentials: "include"
            });

            const data = await res.json();
            console.log(data);
            setUserData(data);
            
            if(!res.status === 200 ){
                const error = new Error(res.error);
                throw error;
            }

        }
        
        catch(err){
            console.log(err);
            history('/login');
        }
    }

    useEffect(() => {
         callAddpage();
    }, []);

    const [inputs, setInputs] = useState({
        name:"",
        description:"",
        price:"",
        author:"",
        
        image:""
    });
    
    const [Checked, setChecked] = useState(false);

    const handleChange = (e) => {
        setInputs((prevState) => (
            {
                ...prevState,
                [e.target.name]: e.target.value
           }
        ))

       //console.log(e.target.name, "Value", e.target.value);
    }
    
    const sendRequest = async() =>{
       await axios.post("http://localhost:5000/books", {
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
         console.log(inputs,Checked);
         sendRequest().then(()=>history('/books'));
    }

    return(
    
      
    <form  method="GET"  onSubmit={handleSubmit}> 
        <Box 
          display="flex" 
          flexDirection="column" 
          justifyContent="center" 
          maxWidth={700}
          alignContent={"center"}
          alignSelf="center"
          marginLeft={"auto"}
          marginRight={"auto"}
          marginTop={7}
          bgcolor={"#f8f4f4"}
          marginBottom={"60px"}
          paddingRight={"30px"}
          paddingLeft={"30px"}
          
          >
        <div style={{fontWeight: "700",letterSpacing: "2px", textTransform: "uppercase",font:"700" ,fontFamily: "inherit",
        textAlign:"center", fontSize:"xx-large"}}>Add in Your Buckit! </div>
        <FormLabel>Name</FormLabel>
        <TextField 
           value={inputs.name}
           onChange={handleChange}
           type="String"
           margin="normal" 
           fullWidth 
           variant="outlined" 
           name="name" />

        <FormLabel>Company or Author</FormLabel>
        <TextField 
           value={inputs.author}
           onChange={handleChange}
           type="String"
           margin="normal" 
           fullWidth 
           variant="outlined" 
           name="author" />

        <FormLabel>Any Description</FormLabel>
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

        <FormControlLabel control={<Checkbox checked={Checked} />} onChange={()=>setChecked(!Checked)} label="Available" />
        <Button sx={{color:"white", backgroundColor:"#3d4c4e"}} variant="contained" type="submit">Add your Item</Button>
        </Box>
    </form>
    
    )
  }
  
  export default AddBook ;