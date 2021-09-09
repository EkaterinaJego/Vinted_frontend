import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useHistory, Link } from "react-router-dom";
import "./login.css";

const Login = ({ handleLogin, myUrl }) => {
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        response = await axios.post(`${myUrl}/user/login`, {
          email: email,
          password: password,
        });
        if (response.data.token) {
          console.log(response.data);
          const token = response.data.token;
          Cookies.set("token", token);
          handleLogin(token);
          history.push("/");
          setEmail("");
          setPassword("");
        }
      }
    } catch (error) {
      if (error.response.status === 401 || error.response.status === 400)
        console.log("Mauvais email et/ou mot de passe");
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
