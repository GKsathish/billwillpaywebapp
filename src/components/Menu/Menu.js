import React from "react";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './Menu.css';
import { useNavigate } from "react-router-dom"

const Menu = (props) => {
    const { loginstatus, loginstatuschange, setShowloginpage } = props;
    const navigate = useNavigate();
    var url = window.location.origin + "/";

    const handelButton = () => {
        if (loginstatus) {
            window.sessionStorage.clear();
            loginstatuschange(false)
            window.location.reload();
        } else {
            setShowloginpage(true)
        }
    }

    const handelhistoryButton = () => {
        navigate('payment-history')
    }

    return (
        <>
            <Navbar expand="lg" className="bg-body-tertiary m-3">
                <Container className="d-block text-center">
                    <Navbar.Brand href={url} >
                        <img src={`${url}logo.webp`} alt="logo" width="100" height="100" aria-label="Home" />
                    </Navbar.Brand>

                </Container>
            </Navbar>
        </>
    )
}
export default Menu;