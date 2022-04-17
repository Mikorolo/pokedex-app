import React, {FC} from 'react';
import {Route, Routes} from "react-router-dom";
import Home from "./Home/Home";
import Details from "./Details/Details";

const Views:FC = () => {
    return (
        <div>
            <Routes>
                <Route path='/' element={ <Home/> } />
                <Route path='/:id' element={ <Details/> } />
            </Routes>
        </div>
    );
};

export default Views;