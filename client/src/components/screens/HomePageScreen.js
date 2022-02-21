import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Bootstrap from "react-bootstrap";

const HomePageScreen = () => {

    const navigate = useNavigate();

    useEffect(() => {
        if (!localStorage.getItem("authToken")) {
            navigate("/login");
        }
    }, [navigate]);

    const logoutHandler = () => {
        localStorage.removeItem("authToken");
        navigate("/login");
    };

    const navigateHandler = () => {
        navigate("/editprofile");
    };

    return (

        <div>
            <Bootstrap.Navbar bg="primary" expand="lg" variant="dark">
                <Bootstrap.Container>
                    <Bootstrap.Navbar.Brand href="/">Welcome User</Bootstrap.Navbar.Brand>
                    <Bootstrap.Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Bootstrap.Navbar.Collapse id="basic-navbar-nav">
                        <Bootstrap.Nav className="me-auto">
                            <Bootstrap.NavDropdown title="Profile" id="basic-nav-dropdown">
                                <Bootstrap.NavDropdown.Item href="/editprofile">Edit Profile</Bootstrap.NavDropdown.Item>
                            </Bootstrap.NavDropdown>
                        </Bootstrap.Nav>
                        <Bootstrap.Nav className="me-auto">
                            <Bootstrap.Nav.Link onClick={logoutHandler}>Logout</Bootstrap.Nav.Link>
                        </Bootstrap.Nav>
                    </Bootstrap.Navbar.Collapse>
                </Bootstrap.Container>
            </Bootstrap.Navbar>
            <br></br>
            <div className="d-grid gap-2">
                <Bootstrap.Button variant="secondary" size="sm" onClick={navigateHandler}>Edit Profile</Bootstrap.Button>
                <Bootstrap.Button variant="danger" size="sm" onClick={logoutHandler}>Logout</Bootstrap.Button>
            </div>
            
        </div>
    );
};

export default HomePageScreen;