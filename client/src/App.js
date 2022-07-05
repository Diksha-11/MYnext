import Header from "./components/Header";
import React, { createContext, useReducer } from "react";
import Login from "./components/Login";
import Books from "./components/Book/Books";
import AddBook from "./components/AddBook";
import Home from "./components/Home";
import BookDetails from "./components/Book/BookDetails";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Logout from "./components/logout";
import { initialState , reducer } from "./reducers/useReducer";

//Context API
export const UserContext = createContext();

const Routing = () => {
  return (
    <main>
      <Routes>
        <Route path="/" element={<Home />} exact />
        <Route path="/add" element={<AddBook />} exact />
        <Route path="/books" element={<Books />} exact />
        <Route path="/login" element={<Login />} exact />
        <Route path="/register" element={<Signup />} exact />
        <Route path="/logout" element={<Logout />} exact />
        <Route path="/books/:id" element={<BookDetails />} exact />
      </Routes>
    </main>
  )
}


const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return(
    <>
        <UserContext.Provider value={{state, dispatch}}>
             <header><Header /></header>
             <Routing />
             
        </UserContext.Provider>
  </>
  )
}

export default App;
