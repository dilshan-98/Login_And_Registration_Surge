import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Private routing
import PrivateRoute from "./components/routing/PrivateRoute";

//screens for app
import HomePageScreen from "./components/screens/HomePageScreen";
import EditProfileScreen from "./components/screens/EditProfileScreen";
import LoginScreen from "./components/screens/LoginScreen";
import RegisterScreen from "./components/screens/RegisterScreen";


const App = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<PrivateRoute><HomePageScreen /></PrivateRoute>}></Route>
          <Route exact path="/editprofile" element={<PrivateRoute><EditProfileScreen /></PrivateRoute>}></Route>
          <Route exact path="/login" element={<LoginScreen />} />
          <Route exact path="/register" element={<RegisterScreen />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
