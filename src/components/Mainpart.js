import VintedPhoto from "../images/vintedmainimg.jpg";
import "./mainpart.css";

const Mainpart = () => {
  return (
    <div className="mainpartbody">
      <img className="mainpartimg" src={VintedPhoto} alt="mainphoto" />
      <div className="incitation">
        <h1>Prêts à faire du tri dans vos placards ?</h1>
        <div className="incitbutton">
          <button>Commencer à vendre</button>
        </div>
      </div>
    </div>
  );
};

export default Mainpart;
