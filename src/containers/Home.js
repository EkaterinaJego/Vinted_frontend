import Header from '../components/Header'
import {Link} from "react-router-dom"

const Home = () => {
    return <div>
         <Link to="/offer/:id">Offer</Link>
        <Header />
      
    </div>
}

export default Home;