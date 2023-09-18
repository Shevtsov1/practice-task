import React from "react";
import {BrowserRouter as Router, Routes, Route, useParams} from "react-router-dom";
import Home from "./components/Home";
import "./styles/Reset.css"
import "./styles/App.css"
import 'bootstrap/dist/css/bootstrap.min.css'
import "@fontsource/roboto"; // Defaults to weight 400
import "@fontsource/roboto/400.css"; // Specify weight
import "@fontsource/roboto/400-italic.css"; // Specify weight and style
import Background from "./components/auth/Background";
import SignUp from "./components/auth/SignUp";
import SignIn from "./components/auth/SignIn";

function App() {

  return (
    <div className="App">
        <Router>
            <Routes>
                <Route path={"/"} element={<><Background/><SignUp/></>}></Route>
                <Route path={"/home"} element={<Home/>}></Route>
                <Route path={"/SignUp"} element={<><Background/><SignUp/></>}/>
                <Route path={"/SignIn"} element={<><Background/><SignIn/></>}/>
            </Routes>
        </Router>n
    </div>
  );
}

export default App;
