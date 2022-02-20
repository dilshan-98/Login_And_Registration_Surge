import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./RegisterScreen.css";

const RegisterScreen = ({ history }) => {
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("authToken")) {
            navigate("/");
        }
    }, [navigate]);

    const registerHandler = async (e) => {
        e.preventDefault();

        const settings = {
            header: {
                "Content-type": "application/json"
            }
        }

        if (password !== confirmpassword) {
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => {
                setError("");
            }, 4000);
            return setError("Passwords Do Not Match");
        }

        try {
            const { data } = await axios.post("/api/user/register", { fullname, username, email, password }, settings);
            console.log(data)

            localStorage.setItem("authToken", data.token);

            navigate("/");
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 4000);
        }
    }

    return (
        <div className="register-screen">
            <form onSubmit={registerHandler} className="register-screen__form">
                <h3 className="register-screen__title">Register</h3>
                {error && <span className="error-message">{error}</span>}
                <div className="form-group">
                    <label htmlFor="fullname">Full Name</label>
                    <input type="text" required id="fullname" tabIndex={1} placeholder="Enter Full Name" value={fullname} onChange={(e) => setFullname(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="username">Username</label>
                    <input type="text" required id="username" tabIndex={2} placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" required id="email" tabIndex={3} placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" required id="password" tabIndex={4} placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmpassword">Confirm Password</label>
                    <input type="password" required id="confirmpassword" tabIndex={5} placeholder="Confirm Password" value={confirmpassword} onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary" tabIndex={6}>
                    Register
                </button>

                <span className="register-screen__subtext">
                    Already a User? <Link to="/login" tabIndex={7}>Login</Link>
                </span>
            </form>
        </div>
    );
};

export default RegisterScreen;
