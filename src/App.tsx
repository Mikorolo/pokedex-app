import React from 'react';
import './App.css';
import {BrowserRouter} from "react-router-dom";
import NavigationBar from "./components/Navbar/NavigationBar";
import Views from "./views/Views";

function App() {
  return (
      <BrowserRouter>
        <NavigationBar/>
        <Views/>
      </BrowserRouter>
  );
}

export default App;
