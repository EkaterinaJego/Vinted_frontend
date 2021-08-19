import React, { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./checkoutform.css";
import axios from "axios";

const CheckoutForm = ({ product_name, totalprice }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [completed, setCompleted] = useState(false);

  const handleCheckoutFormSubmit = async (event) => {
    try {
      event.preventDefault();
      // Récupération des données bancaires de l'utilisateur :
      const cardElement = elements.getElement(CardElement);
      // Demande de création d'un token via l'API Stripe
      // On envoie les données bancaires dans la requête
      const stripeResponse = await stripe.createToken(cardElement, {
        name: "L'id de l'acheteur",
      });
      console.log("CheckoutForm / stripeResponse= ", stripeResponse);

      const stripeToken = stripeResponse.token.id;

      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          token: stripeToken,
          amount: totalprice,
          title: product_name,
        }
      );
      console.log(response.data);
      if (response.data.status === "succeeded") {
        setCompleted(true);
      } else {
        alert("Merci de reessayer, une erreur est survenue");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      {!completed ? (
        <div className="bankcardform">
          <form onSubmit={handleCheckoutFormSubmit}>
            <CardElement />
            <div className="bankcardbtnparent">
              <button
                type="submit"
                className="bankcardbtn"
                disabled={!stripe || !elements}
              >
                Valider
              </button>
            </div>
          </form>
        </div>
      ) : (
        <span>Paiement a été effectué !</span>
      )}
    </>
  );
};

export default CheckoutForm;
