import { useState } from "react";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import "./checkoutform.css";
import axios from "axios";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [completed, setCompleted] = useState(false);

  const handleCheckoutFormSubmit = async (event) => {
    event.preventDefault();
    const cardElement = elements.getElement(CardElement);
    const stripeResponse = await stripe.createToken(cardElement);
    console.log("CheckoutForm / stripeResponse= ", stripeResponse);

    const stripeToken = stripeResponse.token.id;
    const response = await axios.post(
      "https://lereacteur-vinted-api.herokuapp.com/payment",
      {
        stripeToken,
      }
    );
    console.log(response.data);
    if (response.data.status === "succeeded") {
      setCompleted(true);
    }
  };

  return (
    <>
      {!completed ? (
        <form onSubmit={handleCheckoutFormSubmit} className="bankcardform">
          <CardElement />
          <button
            type="submit"
            className="bankcardbtn"
            disabled={!stripe || !elements}
          >
            Valider
          </button>
        </form>
      ) : (
        <span>Paiement a été effectué !</span>
      )}
    </>
  );
};

export default CheckoutForm;
