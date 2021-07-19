import logo from "../images/logoVinted.png";
import "./header.css";


const Header = () => {
    return (<>
    <div className='mainHeader'>
       <img className="Logo" src={logo} alt="vintedlogo" />
       <input type="text" placeholder="Recherche des articles" />
        <button className="inscriptionButton">S'inscrire</button>
        <button className="connexionButton">Se connecter</button>
        <button className="venteButton">Vends tes articles</button>
    </div>

   
    </>)
}

export default Header;