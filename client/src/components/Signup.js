import React, { useState } from 'react';
import { Button } from '@mui/material';
import { NavLink, useNavigate} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser } from '../actions/userActions';

const Signup = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        name: "", email: "", password: "", cpassword: ""
    });

    let name, value;
    const handleInputs =async (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;

        setUser({ ...user, [name]: value });
    }

    const PostData = async (e) =>{
        e.preventDefault();
        const{ name, email, password, cpassword } = user;

        const res = await fetch("/register", {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },

            body:JSON.stringify({
                name, email, password, cpassword              
            })
        });

        const data =  await res.json();

        if(res.status === 422 || !data){
            window.alert("Invalid Registration"); 
            console.log("Invalid Registration");
        }else{
            window.alert("Registration Successful"); 
           
            navigate("/login");
        }
    }

    return (
        <>
            <center style={{ marginBottom: "30px", marginTop: "30px" }} >
                <div className="app">
                <div className="icon">
                    <div className="icon_class"></div>
                    <div className="text">Sign Up</div>
                </div>

                <form className='register-form' id='register-form' method='POST'>
                     
                        <div sx={{ backgroundColor: "#3d4c4e", color: "white", width: "100%" }} >
                            <div className='form-group'>
                                <label htmlFor='name'>
                                    <i className='zmdi zmdi-account material-icons-name'></i>
                                </label>
                                <input type="text" name='name' id='name' autoComplete='off' placeholder='Enter Name'
                                    value={user.name}
                                    style={{margin:"10px", height:"35px", width:"80%", borderRadius:"15px", padding:"6px"}}
                                    onChange={handleInputs} />
                            </div>


                            <div className='form-group'>
                                <label htmlFor='email'>
                                    <i className='zmdi zmdi-account material-icons-name'></i>
                                </label>
                                <input type="email" name='email' id="email" autoComplete='off' placeholder='Enter email'
                                    value={user.email}
                                    style={{margin:"10px", height:"35px", width:"80%", borderRadius:"15px", padding:"6px"}}
                                    onChange={handleInputs} />
                            </div>


                            <div className='form-group'>
                                <label htmlFor='password'>
                                    <i className='zmdi zmdi-account material-icons-name'></i>
                                </label>

                                <input type="password" name='password' id="password" autoComplete='off' placeholder='Enter Password'
                                    value={user.password}
                                    style={{margin:"10px", height:"35px", width:"80%", borderRadius:"15px", padding:"6px"}}
                                    onChange={handleInputs} />
                            </div>

                            <div className='form-group'>
                                <label htmlFor='cpassword'>
                                    <i className='zmdi zmdi-account material-icons-name'></i>
                                </label>
                                <input type="password" name='cpassword' id="cpassword" 
                                autoComplete='off' placeholder='Confirm Password'
                                style={{margin:"10px", height:"35px", width:"80%", borderRadius:"15px", padding:"6px"}}
                                    value={user.cpassword}
                                    onChange={handleInputs} />
                            </div>

                            <div className='form-group form-button'>
                                <input type="submit"
                                style={{margin:"10px", height:"39px", width:"80%",}}
                                 name='signup' id='signup' className='form-submit' value="register" onClick={PostData}>
                                </input>
                            </div>
                        </div>

                </form>


                <div>
                    <NavLink to="/login" className="signup-image-link">
                        I'm already Registered
                    </NavLink>
                </div>



            </div>
            </center>
        </>
    )
};

export default Signup;
