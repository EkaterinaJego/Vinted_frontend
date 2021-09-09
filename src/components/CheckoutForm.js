import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./checkoutform.css";
import axios from "axios";

const CheckoutForm = ({ product_name, totalprice, myUrl, token }) => {
  const [isPaid, setIsPaid] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  console.log("CHECHOUTFORM TOKEN==>", token);

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const cardElement = elements.getElement(CardElement);
      console.log("CARD_ELEMENT==>", cardElement);
      const stripeResponse = await stripe.createToken(cardElement);
      console.log("StripeResponse = ", stripeResponse);

      const stripeToken = stripeResponse.token.id;
      console.log("STRIPETOKEN==>", stripeToken);

      const response = await axios.post(
        `${myUrl}/payment`,

        {
          amount: totalprice,
          title: product_name,
          source: stripeToken,
        }
      );

      console.log("Server's response ==> ", response.data);

      if (response.data.status === "succeeded") {
        setIsPaid(true);
      } else {
        alert("Une erreur est survenue, veuillez réssayer.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return isPaid ? (
    <p>Merci pour votre achat.</p>
  ) : (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit">Pay</button>
    </form>
  );
};

export default CheckoutForm;
