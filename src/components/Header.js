import logo from "../images/logoVinted.png";
import "./header.css";
import { Range } from "react-range";
import { Link } from "react-router-dom";
import {
  // faSearch,
  // faLIst,
  FontAwesomeIcon,
} from "@fortawesome/react-fontawesome";

const Header = ({
  token,
  handleLogout,
  title,
  handleTitle,
  rangeValues,
  handleRange,
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
          <div className="search">
            <FontAwesomeIcon icon="search" className="searchicon" />
            <input
              type="text"
              placeholder="Recherche des articles"
              onChange={handleTitle}
              value={title}
            />
          </div>
          <Range
            step={1}
            min={0}
            max={1000}
            values={rangeValues}
            onChange={(values) => handleRange(values)}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "6px",
                  width: "100%",
                  backgroundColor: "#ccc",
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "10px",
                  width: "10px",
                  backgroundColor: "#999",
                }}
              />
            )}
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
            <div className="signuploginbuttons">
              <Link to="/user/signup">
                <button className="inscriptionButton">S'inscrire</button>
              </Link>
              <Link to="/user/login">
                <button className="connexionButton">Se connecter</button>
              </Link>
            </div>
          )}
        </div>
        <div>
          <Link to={token ? "/publish" : undefined}>
            <button className="venteButton">Vends tes articles</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
