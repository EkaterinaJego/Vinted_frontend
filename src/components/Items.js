import { Link } from "react-router-dom";
import "./items.css";

const Item = ({ offers, filteredOffers }) => {
  return (
    <div>
      {filteredOffers ? (
        <div>
          {filteredOffers.map((filterOff, id) => {
            return (
              <div className="item" key={filterOff._id}>
                <div className="offer-userinfo">
                  <div>{filterOff.owner.account.username}</div>
                </div>
                <div className="offer-info">
                  <Link to={`/offer/${filterOff._id}`}>
                    <div>
                      <img
                        className="offer-image"
                        src={filterOff.product_image.secure_url}
                        alt="item_photo"
                      />
                    </div>
                  </Link>
                  <div>{filterOff.product_price}$</div>
                  <div>{filterOff.product_size}</div>
                  <div>{filterOff.product_name}</div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="offers-container">
          {offers.map((offer, id) => {
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
                  <div>{offer.product_price}$</div>
                  <div>{offer.product_size}</div>
                  <div>{offer.product_name}</div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Item;
