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

    return (
        <div>
            <div style={{ background: "green", color: "white" }}>Welcome</div>
            <button onClick={logoutHandler}>Logout</button>
            <button ><Link to="/editprofile"></Link>prof</button>
            <span>
                    New Users? <Link to="/editprofile" tabIndex={5}> Register </Link>
            </span>
        </div>
    );
};

export default HomePageScreen;