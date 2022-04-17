import React from 'react';
import {Container, Image, Navbar} from "react-bootstrap";
import logo from '../../assets/img/logo.png';

const NavigationBar = () => {

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href='/'><Image className='logo' src={logo}/><strong className='ms-1'>Pokédex</strong></Navbar.Brand>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;