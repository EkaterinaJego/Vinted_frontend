import React from "react";
import { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [deconnect, setDeconnect] = useState(false);

  const handleEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const fetchData = async () => {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/login",
        { email: email, password: password }
      );
      if (response) {
        const token = response.data.token;
        console.log(token);
        Cookies.set("token", token);
        Cookies.get("token");
        alert("Welcome back!");
        setEmail("");
        setPassword("");
      } else if (!response) {
        return alert("The authorization isn't possible");
      }
    };
    fetchData();
  };

  const handleDeconnect = () => {
    setDeconnect(true);
  };

  return (
    <>
      <Header />
      <div className="formulaire">
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
          <button type="submit">Se connecter</button>

          <button onClick={handleDeconnect}>Se déconnecter</button>
          {deconnect
            ? alert("You've been disconnected") &&
              Cookies.remove("token") && <Link to="/"></Link>
            : ""}
        </form>
      </div>
    </>
  );
};

export default Login;
