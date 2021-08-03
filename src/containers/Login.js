import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const Login = ({ handleLogin, setLogens }) => {
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
      }
      if (response.data.token) {
        const token = Cookies.set("token", response.data.token);
        const username = response.data.account.username;
        handleLogin(token);
        console.log(`Welcome back, ${username}!`);
        console.log(Cookies.get("userToken"));
        setEmail("");
        setPassword("");
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <>
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
        </form>
      </div>
    </>
  );
};

export default Login;
