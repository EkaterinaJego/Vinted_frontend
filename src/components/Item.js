import { Link } from "react-router-dom";
import "./item.css";

const Item = ({ offers }) => {
  return (
    <div className="offers-container">
      {offers.map((offer, id) => {
        return (
          <Link to={`/offer/${offer._id}`}>
            <div className="item" key={offer._id}>
              <div className="offer-info">
                <div>{offer.product_name}</div>
                <div>{offer._id}</div>
                <div>{offer.product_price}$</div>
              </div>
              <img
                className="offer-image"
                src={offer.product_image.secure_url}
                alt="item_photo"
              />
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default Item;
