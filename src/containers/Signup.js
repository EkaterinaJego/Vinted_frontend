import React from "react";
import { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Cookies from "js-cookie";

const Signup = () => {
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleEmail = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePhone = (event) => {
    const value = event.target.value;
    setPhone(value);
  };

  const handleUsername = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handlePassword = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const fetchData = async () => {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/user/signup",
        {
          email: email,
          phone: phone,
          username: username,
          password: password,
        }
      );
      if (response) {
        const token = response.data.token;
        Cookies.set("token", token, { expires: 7 });
        alert(`Bienvenu sur le site, ${username}`);
        setEmail("");
        setPassword("");
        setUsername("");
        setPhone("");
      } else if (!response) {
        return alert("Your registration is impossible");
      }
    };
    fetchData();
  };

  return (
    <>
      <Header />
      <div className="formulaire">
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            height: "auto",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 45%",
          }}
        >
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
            type="text"
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
          <input type="checkbox" />
          <label>S'inscrire à la newsletter</label>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos
            aperiam velit beatae quis sint inventore earum neque, vero quibusdam
            impedit ullam non asperiores. Vitae, iste voluptatibus veritatis
            dolorum eligendi omnis!
          </p>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default Signup;
