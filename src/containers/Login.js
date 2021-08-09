import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory, Link } from "react-router-dom";
import "./login.css";

const Login = ({ handleLogin }) => {
  const history = useHistory();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      let response;
      if (email && password) {
        response = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/user/login",
          { email: email, password: password }
        );
        if (response.data.token) {
          const token = response.data.token;
          Cookies.set("token", token);
          const username = response.data.account.username;
          handleLogin(token);
          history.push("/");
          // console.log(`Login / Welcome back, ${username}!`);
          setEmail("");
          setPassword("");
        }
      }
    } catch (error) {
      console.log("erreur : ", error.response);
    }
  };

  return (
    <>
      <div className="loginform">
        <span>Se connecter</span>

        <form onClick={handleSubmit}>
          <input
            type="email"
            placeholder="Adresse email"
            onChange={handleEmail}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            onChange={handlePassword}
          />
          <button type="submit" className="loginsubmitbtn">
            Se connecter
          </button>
          <Link to="/user/signup" style={{ textDecoration: "none" }}>
            <div className="signuplinkmain">
              <div className="signuplink">
                Pas encore de compte ? Inscris-toi
              </div>
            </div>
          </Link>
        </form>
      </div>
    </>
  );
};

export default Login;
