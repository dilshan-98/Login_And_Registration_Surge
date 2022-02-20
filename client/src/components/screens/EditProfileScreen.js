import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./EditProfileScreen.css";

const EditProfileScreen = () => {
    const [fullname, setFullname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const navigate = useNavigate();


    useEffect(() => {
        if (!localStorage.getItem("authToken")) {
            navigate("/login");
        }

        const fetchPrivateData = async () => {
            const settings = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                },
            };

            try {
                const { data } = await axios.get("/api/user/userDetails", settings);
                setFullname(data.data.fullname);
                setUsername(data.data.username);
            } catch (error) {
                localStorage.removeItem("authToken");
                setError("You are not authorized to access, please login");
            }
        };
        
        fetchPrivateData();
    }, [navigate])

    

    const submitHandler = (e) => {
        e.preventDefault();

        const settings = {
            header: {
                "Content-type": "application/json",
            },
        };

        try {
            // const {data} = await axios.post("/api/user/login", {username,password}, settings);
            // console.log(data);
            // localStorage.setItem("authToken", data.token);
            // localStorage.setItem("userDetails", JSON.stringify(data))

            navigate("/");
        } catch (error) {
            setError(error.response.data.error);

            setTimeout(() => {
                setError("");
            }, 4000);
        }

    };

    return (
        <div className="editprofile-screen">
            <form className="editprofile-screen__form">
                <h3 className="login-screen__title">Login</h3>
                {/**error && <span className="error-message">{error}</span>**/}
                {/**success && (
                    <span className="success-message">
                        Updated Successfully
                    </span>
                )**/}
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
                    <label htmlFor="password">Password</label>
                    <input type="password" required id="password" tabIndex={3} placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmpassword">Confirm Password</label>
                    <input type="password" required id="confirmpassword" tabIndex={4} placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                </div>

                <button type="submit" className="btn btn-primary" tabIndex={5}>
                    Register
                </button>
            </form>
        </div>
    );

};


export default EditProfileScreen;