import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

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
            <div style={{ background: "green", color: "white" }}>Welcome</div>
            <button onClick={logoutHandler}>Logout</button>
            <button onClick={navigateHandler}>Edit Profile</button>
        </div>
    );
};

export default HomePageScreen;