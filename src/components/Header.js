import logo from "../images/logoVinted.png";
import "./header.css";
import { Link } from "react-router-dom";
import {
  faSearch,
  faLIst,
  FontAwesomeIcon,
} from "@fortawesome/react-fontawesome";

const Header = () => {
  return (
    <div className="main">
      <div className="headerbody">
        <div className="logo">
          <Link to="/">
            <img src={logo} alt="vintedlogo" />
          </Link>
        </div>
        <div className="searchbar">
          <FontAwesomeIcon icon="search" className="searchicon" />
          <input type="text" placeholder="Recherche des articles" />{" "}
        </div>
        <div className="threebuttons">
          <div className="signuploginbuttons">
            <Link to="/user/signup">
              <button className="inscriptionButton">S'inscrire</button>
            </Link>
            <Link to="/user/login">
              <button className="connexionButton">Se connecter</button>
            </Link>
          </div>
          <button className="venteButton">Vends tes articles</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
