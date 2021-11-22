import logo from "../images/logoVinted.png";
import "./header.css";
import PriceRange from "../components/PriceRange";
import { Link, useHistory, useLocation } from "react-router-dom";
import Toggle from "react-toggle";
import "./toggle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Cookies from "js-cookie";

const Header = ({
  token,
  setToken,
  title,
  handleTitle,
  rangeValues,
  handleRange,
  sort,
  handleSort,
}) => {
  const history = useHistory();

  const handleLogout = () => {
    Cookies.remove("token");
    setToken("");
    history.push("/user/signup");
  };

  const location = useLocation();

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
           //* <FontAwesomeIcon icon="search" className="searchicon" /> *//
            <input
              type="text"
              placeholder="Recherche des articles"
              onChange={handleTitle}
              value={title}
            />
          </div>
          {location.pathname === "/" ? (
            <div className="toggleandrange">
              <span className="togglespan">Trier par prix :</span>
              <div className="toggle">
                <Toggle
                  defaultChecked={sort}
                  icons={{
                    checked: (
                      <div>
                        <FontAwesomeIcon
                          icon="arrow-up"
                          className="arrowupicon"
                        />
                      </div>
                    ),
                    unchecked: (
                      <div>
                        <FontAwesomeIcon
                          icon="arrow-down"
                          className="arrowdownicon"
                        />
                      </div>
                    ),
                  }}
                  onChange={handleSort}
                />
              </div>
              <PriceRange rangeValues={rangeValues} handleRange={handleRange} />
            </div>
          ) : null}
        </div>
        <div className="allbuttons">
          <div className="threebuttons">
            {token ? (
              <div>
                <button className="logoutButton" onClick={handleLogout}>
                  Se déconnecter
                </button>
              </div>
            ) : (
              // null
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
    </div>
  );
};

export default Header;
