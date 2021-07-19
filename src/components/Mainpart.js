import VintedPhoto from "../images/vintedmainimg.jpg" ;
import "./mainpart.css";

const Mainpart = () => {
    return (
        <div className="mainpartbody">
            <img  src={VintedPhoto} alt="mainphoto" />
            <div className="incitation">
                <h1>Prêts à faire du tri dans vos placards ?</h1>
                <button>Commencer à vendre</button>
            </div>
        </div>
    )
}

export default Mainpart; 