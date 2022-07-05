





import React, { useState, useContext } from 'react';
import { AppBar, Tab, Tabs, Toolbar, Typography } from '@mui/material';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import { NavLink } from 'react-router-dom';
import { UserContext } from '../App';

const Header = () => {
    const { state, dispatch } = useContext(UserContext);
    const [value, setValue] = useState();

    const RenderMenu = () => {
        if (state) {
            return (
                <>
                    <Tab LinkComponent={NavLink} to="/books" label="My Wishlist" ></Tab>
                    <Tab LinkComponent={NavLink} to="/add" label="Add Items"></Tab>
                    <Tab LinkComponent={NavLink} to="/logout" label="Logout"></Tab>
                </>
            )
        } else {
            return (
                <>
                  
                    <Tab LinkComponent={NavLink} to="/add" label="Add Items"></Tab>
                    <Tab LinkComponent={NavLink} to="/login" label="Login"></Tab>
                </>
            )
        }
    }

    return (
        <div>
            <AppBar sx={{ backgroundColor: "#36454F" }} position='sticky'>
                <Toolbar>
                    <NavLink to="/" style={{ color: "white" }}>
                        <Typography><LibraryBooksIcon style={{ paddingRight: 6 }} />MYnext</Typography></NavLink>
                    <Tabs
                        sx={{ ml: "auto" }}
                        indicatorColor='secondary' textColor='inherit' value={value} onChange={(e, val) => setValue(val)} >

                        {/*<Tab LinkComponent={NavLink} to="/books" label="My Wishlist" ></Tab>
                        <Tab LinkComponent={NavLink} to="/add" label="Add Items"></Tab>
                        <Tab LinkComponent={NavLink} to="/login" label="Login"></Tab>
                        <Tab LinkComponent={NavLink} to="/logout" label="Logout"></Tab>*/}

                        <RenderMenu />
                    </Tabs>
                </Toolbar>
            </AppBar>
        </div>
    )
};

export default Header;
