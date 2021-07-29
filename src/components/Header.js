import logo from "../images/logoVinted.png";
import ResearchBar from "./ResearchBar";
import "./header.css";
import { Link } from "react-router-dom";
import {
  faSearch,
  faLIst,
  FontAwesomeIcon,
} from "@fortawesome/react-fontawesome";

const Header = ({
  token,
  handleLogout,
  offers,
  setFilteredOffers,
  handleSearch,
}) => {
  return (
    <div className="main">
      <div className="headerbody">
        <div className="logo">
          <Link to="/">
            <img src={logo} className="logoimg" alt="vintedlogo" />
          </Link>
        </div>
        <ResearchBar
          offers={offers}
          setFilteredOffers={setFilteredOffers}
          handleSearch={handleSearch}
        />
        <div className="threebuttons">
          {token ? (
            <div>
              <button className="logoutbutton" onClick={handleLogout}>
                Se déconnecter
              </button>
            </div>
          ) : (
            <div className="signuploginbuttons">
              <Link to="/user/signup">
                <button className="inscriptionButton">S'inscrire</button>
              </Link>
              <Link to="/user/login">
                <button className="connexionButton">Se connecter</button>
              </Link>
            </div>
          )}
          <button className="venteButton">Vends tes articles</button>
        </div>
      </div>
    </div>
  );
};

export default Header;
