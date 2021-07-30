import logo from "../images/logoVinted.png";
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
  title,
  handleTitle,
  // priceMin,
  // priceMax,
  // setPriceMin,
  // setPriceMax,
  handlePriceMin,
  handlePriceMax,
  setSort,
  handleSortAsc,
  handleSortDesc,
  setSwitchValue,
  switchValue,
}) => {
  return (
    <div className="main">
      <div className="headerbody">
        <div className="logo">
          <Link to="/">
            <img src={logo} className="logoimg" alt="vintedlogo" />
          </Link>
        </div>
        <div className="filters">
          <div></div>
          <div className="search">
            <FontAwesomeIcon icon="search" className="searchicon" />
            <input
              type="text"
              placeholder="Recherche des articles"
              onChange={handleTitle}
              value={title}
            />
          </div>
          <input
            className="priceMinMax"
            type="number"
            onChange={handlePriceMin}
          />
          <input
            className="priceMinMax"
            type="number"
            onChange={handlePriceMax}
          />
        </div>

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
