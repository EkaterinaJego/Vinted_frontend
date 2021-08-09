import logo from "../images/logoVinted.png";
import "./header.css";
import { Range } from "react-range";
import { Link, useHistory } from "react-router-dom";
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
            <div className="range">
              <Range
                step={1}
                min={1}
                max={100000}
                values={rangeValues}
                onChange={(values) => handleRange(values)}
                renderTrack={({ props, children }) => (
                  <div
                    {...props}
                    style={{
                      ...props.style,
                      height: "6px",
                      width: "100%",
                      backgroundColor: "#2da8b1",
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
                      height: "20px",
                      width: "20px",
                      borderRadius: "10px",
                      border: "none",
                      backgroundColor: "#2db9c1",
                    }}
                  />
                )}
              />
            </div>
          </div>
        </div>

        <div className="threebuttons">
          {token ? (
            <div>
              {/* {handleLogout && history.push("/user/signup")} */}
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

export default Header;
