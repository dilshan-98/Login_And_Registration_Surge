import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./LoginScreen.css";


const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if(localStorage.getItem("authToken")){
            navigate("/");
        }
    }, [navigate]);

    const loginHandler = async (e) => {
        e.preventDefault();

        const settings = {
            header: {
                "Content-type": "application/json",
            },
        };

        try {
            const {data} = await axios.post("/api/user/login", {email,password}, settings);
            console.log(data);
            localStorage.setItem("authToken", data.token);

            navigate("/");
        } catch (error) {
            setError(error.response.data.error);

            setTimeout(() => {
                setError("");
            }, 4000);
        }
    };

    return (
        <div className="login-screen">
            <form onSubmit={loginHandler} className="login-screen__form">
                <h3 className="login-screen__title">Login</h3>
                {error && <span className="error-message">{error}</span>}
                <div className="form-group">
                    <label htmlFor="email">Email : </label>
                    <input type="email" required id="email" tabIndex={1} placeholder="Enter Email" onChange={(e) => setEmail(e.target.value)} value={email} />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password : </label>
                    <input type="password" required id="password" tabIndex={2} placeholder="Enter Password" onChange={(e) => setPassword(e.target.value)} value={password} />
                </div>
                <button type="submit" className="btn btn-primary" tabIndex={3}>Login</button>
                <span className="login-screen__subtext">
                    New Users? <Link to="/register" tabIndex={5}> Register </Link>
                </span>
            </form>
        </div>
    );
};

export default LoginScreen;