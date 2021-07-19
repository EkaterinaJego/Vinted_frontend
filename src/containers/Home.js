import Header from '../components/Header'
import Mainpart from "../components/Mainpart"
import {Link} from "react-router-dom"

const Home = () => {
    return <div>
         <Link to="/offer/:id">Offer</Link>
        <Header />
        <Mainpart />
    </div>
}

export default Home;