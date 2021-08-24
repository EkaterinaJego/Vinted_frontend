import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./checkoutform.css";
import axios from "axios";

const CheckoutForm = ({ product_name, totalprice, myUrl }) => {
  const [isPaid, setIsPaid] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const cardElement = elements.getElement(CardElement);

      const stripeResponse = await stripe.createToken(cardElement);
      console.log("StripeResponse = ", stripeResponse);

      const stripeToken = stripeResponse.token.id;

      // const response = await axios.post(`${myUrl}/payment`, {
      const response = await axios.post(
        "https://lereacteur-vinted-api.herokuapp.com/payment",
        {
          amount: totalprice,
          title: product_name,
          token: stripeToken,
        }
      );
      console.log(response.data);

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
