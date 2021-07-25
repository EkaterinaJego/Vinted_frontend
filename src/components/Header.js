import logo from "../images/logoVinted.png";
import "./header.css";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="mainHeader">
      <div></div>
      <Link to="/">
        <img className="Logo" src={logo} alt="vintedlogo" />
      </Link>
      <input type="text" placeholder="Recherche des articles" />
      <Link to="/user/signup">
        <button className="inscriptionButton">S'inscrire</button>
      </Link>
      <Link to="/user/login">
        <button className="connexionButton">Se connecter</button>
      </Link>
      <button className="venteButton">Vends tes articles</button>
    </div>
  );
};

export default Header;
