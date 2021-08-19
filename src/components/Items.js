import { Link } from "react-router-dom";
import "./items.css";

const Item = ({ offers }) => {
  return (
    <div>
      <div className="offers-container">
        {offers.map((offer, _id) => {
          return (
            <div className="item" key={offer._id}>
              <div className="offer-userinfo">
                <div>{offer.owner.account.username}</div>
              </div>
              <div className="offer-info">
                <Link to={`/offer/${offer._id}`}>
                  <div>
                    <img
                      className="offer-image"
                      src={offer.product_image.secure_url}
                      alt="item_photo"
                    />
                  </div>
                </Link>
                <div>{offer.product_price} €</div>
                <div>{offer.product_size}</div>
                <div>{offer.product_name}</div>
              </div>
            </div>
          );
        })}
      </div>
      )
    </div>
  );
};

export default Item;
