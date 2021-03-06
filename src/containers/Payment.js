import { useLocation } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import "./payment.css";
import CheckoutForm from "../components/CheckoutForm";

const stripePromise = loadStripe(
  "pk_test_51JMC11FicsVW9Es4A8vHEOJWU46dweKUGHSpM88VPzHMUHrTNi1F8smonM31TSYCdAzSmrZzuUvvAUOqkSqND9ND00t9VeWRjn"
);

const Payment = ({ myUrl }) => {
  const location = useLocation();

  const { product_name, product_price } = location.state;

  const protectionfees = 0.4;
  const transportfees = 0.8;
  const totalprice = protectionfees + transportfees + product_price;

  return (
    <>
      <div className="paymentmain">
        <div className="paymentpage">
          <div div className="paymentform">
            <div className="resumeofcommand">Resumé de la commande</div>
            <div className="paymentdetails">
              <div className="command">
                <span className="firstspan">Commande</span>
                <span className="secondspan">{product_price} €</span>
              </div>
              <div className="protectionfees">
                <span className="firstspan">Frais protection acheteurs</span>
                <span className="secondspan">{protectionfees} €</span>
              </div>
              <div className="transportfees">
                <span className="firstspan">Frais de port</span>
                <span className="secondspan">{transportfees} €</span>
              </div>
              <div className="totalfees">
                <span className="firstspan">Total :</span>
                <span className="secondspan">{totalprice} €</span>
              </div>
            </div>
            <span className="lastpathtext">
              Il ne vous reste plus qu'un étape pour vous offrir un article
              suivant : <span className="product_name">{product_name}</span>
              .Vous allez payer
              <span> {totalprice} </span>€ (frais de protection et de transport
              inclus).
            </span>
            <div className="checkoutform">
              <Elements stripe={stripePromise}>
                <CheckoutForm
                  product_name={product_name}
                  totalprice={totalprice}
                  myUrl={myUrl}
                />
              </Elements>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
