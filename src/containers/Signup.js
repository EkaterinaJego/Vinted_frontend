import "./signup.css";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import "./signup.css";

const Signup = ({ handleLogin, myUrl }) => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory("");

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handlePhone = (event) => {
    setPhone(event.target.value);
  };

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      let response;
      if (email && phone && username && password) {
        response = await axios.post(`${myUrl}/user/signup`, {
          email: email,
          phone: phone,
          username: username,
          password: password,
        });
      }
      if (response.data.token) {
        const token = response.data.token;
        console.log("SIGNUP / TOKEN = ", response.data);
        handleLogin(token);
        history.push("/"); // TODO: GO TO HOME OR TO PUBLISH
        console.log(`Bienvenu sur le site, ${username}`);
        setEmail("");
        setPassword("");
        setUsername("");
        setPhone("");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="signupbody">
        <div className="signupform">
          <span>S'inscrire</span>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Nom d'utilisateur"
              value={username}
              onChange={handleUsername}
            />
            <input
              type="text"
              placeholder="Numéro de téléphone"
              value={phone}
              onChange={handlePhone}
            />
            <input
              type="email"
              placeholder="Adresse email"
              value={email}
              onChange={handleEmail}
            />
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={handlePassword}
            />
            <div className="checkbox">
              <div className="newsletterinput">
                <input type="checkbox" />
              </div>
              <div className="newsletterinc">S'inscrire à la newsletter</div>
            </div>
            <p>
              En m'inscrivant je confirme avoir lu et accepté les Termes,
              Conditions et Politique de Confidentialité de Vinted. <br /> Je
              confirme avoir au moins 18 ans.
            </p>
            <button type="submit" className="submitformbtn">
              Submit
            </button>
            <Link to="/user/login" style={{ textDecoration: "none" }}>
              <div className="rulesconsent">
                <div className="connectlink">
                  Tu as déjà un compte ? Connecte-toi
                </div>
              </div>
            </Link>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
