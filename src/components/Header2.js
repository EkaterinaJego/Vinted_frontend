import logo from "../images/logoVinted.png";
import { Link, useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";
import "./header2.css";

const Header2 = ({ token, setToken, title, handleTitle }) => {
  const history = useHistory();

  const handleLogout = () => {
    Cookies.remove("token");
    setToken("");
    history.push("/user/signup");
  };

  return (
    <div className="main">
      <div className="headerbody">
        <div className="logo">
          <Link to="/">
            <img src={logo} className="logoimg" alt="vintedlogo" />
          </Link>
        </div>
        <div className="search">
          <FontAwesomeIcon icon="search" className="searchicon" />
          <input
            type="text"
            placeholder="Recherche des articles"
            onChange={handleTitle}
            value={title}
          />
        </div>
        <div className="threebuttons">
          {token ? (
            <div>
              <button className="logoutButton" onClick={handleLogout}>
                Se déconnecter
              </button>
            </div>
          ) : (
            <div>
              <Link to="/user/signup">
                <button className="inscriptionButton">S'inscrire</button>
              </Link>
              <Link to="/user/login">
                <button className="connexionButton">Se connecter</button>
              </Link>
            </div>
          )}
        </div>
        <div className="purchase">
          <Link to={token ? "/publish" : "/user/login"}>
            <button className="purchaseButton">Vends tes articles</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header2;
