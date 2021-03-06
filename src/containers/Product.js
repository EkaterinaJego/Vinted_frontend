import "./product.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { useHistory, useParams } from "react-router-dom";

const Product = ({ info, setInfo, myUrl }) => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get(`${myUrl}/offer/${id}`);
      setInfo(result.data);
      setIsLoading(false);
    };
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="product-body">
      {isLoading ? (
        <div>The page is loading...</div>
      ) : (
        <div className="product-page">
          <div className="product-img">
            <div className="product_photo">
              <img src={info.product_image.secure_url} alt="productpicture" />
            </div>
          </div>
          <div className="product-info">
            <div className="product-price">{info.product_price} €</div>
            {info.product_details.map((detail, index) => {
              const keys = Object.keys(detail);
              return (
                <div key={index} className="product-details">
                  <span>{keys[0]}:</span>
                  <span className="marque-color">{detail[keys[0]]}</span>
                </div>
              );
            })}
            <div className="product-name-description">
              <div className="name">{info.product_name.toUpperCase()}</div>
              <div className="productdescription">
                {info.product_description}
              </div>
            </div>
            <div className="purchasebtn">
              <button
                onClick={() => {
                  history.push("/payment", {
                    product_name: info.product_name,
                    product_price: info.product_price,
                    myUrl: myUrl,
                  });
                }}
              >
                Acheter l'article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Product;
