import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Header2 from "../components/Header2";
import CheckoutForm from "../components/CheckoutForm";
import "./payment.css";

const Payment = ({ info, token, setToken, title, handleTitle }) => {
  const stripePromise = loadStripe(
    "pk_test_51JMC11FicsVW9Es4A8vHEOJWU46dweKUGHSpM88VPzHMUHrTNi1F8smonM31TSYCdAzSmrZzuUvvAUOqkSqND9ND00t9VeWRjn"
  );

  const protectionfees = 0.4;
  const transportfees = 0.8;

  console.log("Payment / info = ", info);

  return (
    <>
      <Header2
        token={token}
        setToken={setToken}
        title={title}
        handleTitle={handleTitle}
      />
      <div className="paymentmain">
        <div className="paymentpage">
          <div className="paymentform">
            <div className="resumeofcommand">Resumé de la commande</div>
            <div className="paymentdetails">
              <div className="command">
                <span className="firstspan">Commande</span>
                <span className="secondspan">{info.product_price} €</span>
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
                <span className="secondspan">
                  {protectionfees + transportfees + info.product_price} €
                </span>
              </div>
            </div>
            <span className="lastpathtext">
              Il ne vous reste plus qu'un étape pour vous offrir
              <span className="product_name"> {info.product_name}</span>. Vous
              allez payer{" "}
              <span className="totalprice">
                {protectionfees + transportfees + info.product_price} €
              </span>
              (frais de protection et de transport inclus).
            </span>
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </div>
        </div>
      </div>
    </>
  );
};

export default Payment;
