import { Link } from "react-router-dom";
import VintedPhoto from "../images/vintedmainimg.jpg";
import "./mainpart.css";

const Mainpart = ({ token }) => {
  return (
    <div className="mainpartbody">
      <img className="mainpartimg" src={VintedPhoto} alt="mainphoto" />
      <div className="incitation">
        <h1>Prêts à faire du tri dans vos placards ?</h1>
        <div className="incitbutton">
          <Link to={token ? "/publish" : "/user/login"}>
            <button>Commencer à vendre</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Mainpart;
