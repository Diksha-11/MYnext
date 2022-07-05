import React, { useState, useEffect } from "react";
import './Home.css';
import tiles from './images/tiles.jpg';
import bg from './images/bg.jfif';
import Box from '@mui/material/Box';
import VerticalLinearStepper from "./slide";


const Home = () => {
  const [userName, setUserName] = useState('');
  const [show, setShow] = useState(false);
 

  const userHomePage = async () => {
    try{
      const res = await fetch('/getdata', {
           method: "GET",
           headers: {
               "Content-Type":"application/json"
           },
      });
      const data = await res.json();
      console.log(data);
      setUserName(data.name);
      setShow(true);
  }catch(err){
      console.log(err);
  }
}

 useEffect(() => {
    userHomePage();
    }, []);


  return (
<> 

      
    
 <Box sx={{ backgroundImage: `url(${bg})`, height: "680px", backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
      <div className="showcase">
        <div className="showcase-overlay">
           <h1>MYnext</h1>
          <h2>{userName}</h2>
          <h2 style={{ fontWeight: "1400" }}>{show ? 'Happy to see you back :)' : 'Hey, I am Your Want-List Pocket!'}</h2>
        </div>
      </div>
    </Box> 
    <h1 className="section-desc">HOW TO HAVE YOUR LIST IN YOUR POCKET</h1>

   <Box sx={{ height:"400px" }}>
       <VerticalLinearStepper/>
   </Box>
 

  <div className='text-center text-dark p-3' style={{ height:"50px",width:"100%",textAlign: "center", fontSize: "14px",marginTop:"60px",
       backgroundColor: "#36454F"}}>
                © 2020 Copyright: <a className='text-dark' style={{ color: "white" }} href='#' > Diksha Sharma</a>
  </div>
  

  
  
  </>

);
}
export default Home;











{/* 
 
<section className='destinations'>
<h3 style={{color:"#205f2e" }}>How is it Useful</h3>

<div className='grid'>
  <div className='main'>
    <img  style={{width:"440px"}} src={tiles} alt='destination-1' />
    <h3>Saves Environment</h3>
    <p>
    Many materials which can be recycled (batteries ,metal etc,) either end up in landfill or in incinerator. Thus, Its high time to get over this problem as 
    It will help in saving 13.8 crore litres water, 10,243
trees & many more.
    </p>
  </div>

  <div className='main'>
    <img style={{width:"440px"}} src={tiles} alt='destination-2' />
    <h3>Interesting Way to Motivate</h3>
    <p>
    Getting the mass audience to segregate the waste at source is quite challenging as there is no interesting factor to the cause 
Cost of transportation , Handling , manpower makes this cycle very costly and inefficient.


   
    </p>
  </div>

  

  
  <div className='main'>
    <img style={{width:"440px"}}  src={tiles} alt='destination-3' />
    <h3>Saves Resources</h3>
    <p>The urban population increasing between 3 – 3.5% per annum. According to a research, 
globally 1 in 9 people are undernourished. Meanwhile, a growing population means higher consumption and greater demand for processed food.
Yearly increase in waste generation is around 5% annually.


    </p>
  </div>

  
</div>

  

    

    </section> */}


