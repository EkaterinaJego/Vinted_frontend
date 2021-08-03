import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Signup = ({ handleLogin }) => {
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

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
        response = await axios.post(
          "https://lereacteur-vinted-api.herokuapp.com/user/signup",
          {
            email: email,
            phone: phone,
            username: username,
            password: password,
          }
        );
      }
      if (response.data.token) {
        const token = response.data.token;
        handleLogin(token);
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
          <input type="checkbox" />
          <label>S'inscrire à la newsletter</label>
          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes,
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
          <button type="submit">Submit</button>
          Vous avez déjà un compte ?
          <Link to="/user/login"> Connectez-vous</Link>
        </form>
      </div>
    </>
  );
};

export default Signup;
