import React, { useContext, useState  } from 'react';
import './Login.css';
import { TextField, Button } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../App';


const Login = () => {
 
  const  {state, dispatch}  = useContext(UserContext);

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch('/login', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      })
    });

    const data =  res.json();
    if (res.status === 400 || !data ) {
      window.alert("Invalid Credentials");
    } else {
      dispatch({type:'USER' , payload:true})
      window.alert("Succesfull Login");
      navigate("/");
    }
  }
  return (
    <>
      <center style={{ marginBottom: "30px", marginTop: "30px" }} >
        <div className="app">
          <div className="icon">
            <div className="icon_class"></div>
            <div className="text">Sign In</div>
          </div>

          <form className='signin-form' id='signin-form' method='POST'>

            <div sx={{ backgroundColor: "#3d4c4e", color: "white", width: "100%" }} >


              <div className='form-group'>
                <label htmlFor='email'>
                  <i className='zmdi zmdi-account material-icons-name'></i>
                </label>
                <input type="email" name='email' id="email" autoComplete='off'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{margin:"20px", height:"45px", width:"80%", borderRadius:"15px", padding:"6px"}}
                  placeholder='Enter email'
                />
              </div>


              <div className='form-group'>
                <label htmlFor='password'>
                  <i className='zmdi zmdi-account material-icons-name'></i>
                </label>

                <input type="password" name='password' id="password" autoComplete='off'
                  value={password}
                  style={{margin:"20px", height:"45px", width:"80%", borderRadius:"15px", padding:"6px"}}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder='Enter Password'
                />
              </div>


              <div className='form-group form-button'>
                <input type="submit" name='signup' id='signup' 
                style={{margin:"20px", height:"55px", width:"80%",}}
                className='form-submit' value="Log In" onClick={loginUser} >
                </input>
              </div>
            </div>

          </form>


          <div>
            <NavLink to="/register" className="signin-image-link">
              Create Account
            </NavLink>
          </div>



        </div>
      </center>
    </>
  )
};


export default Login;











/*

    <center style={{ marginBottom: "30px", marginTop: "30px" }}>
      <div className="app">
        <div className="icon">
          <div className="icon_class"></div>
          <div className="text">Login</div>
        </div>

        <div className="row m-2">
          <input style={{ marginBottom: "20px" }} id="name" className="p-2" type="text" variant="outlined" label="Enter Name" fullWidth />
          <input style={{ marginBottom: "20px" }} id="Password" className="p-2" type="password" variant="outlined" label="Enter Password" fullWidth />
          <input style={{ marginBottom: "20px" }} type="submit" name='signin' id='signin' className='form-submit' value="Log In"></input>

          <Tab LinkComponent={NavLink} to="/register" label="Not Registered Yet?" style={{ color: "black" }}></Tab>
        </div>

      </div>
    </center>

*/