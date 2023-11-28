import { Helmet } from "react-helmet-async";
import Navbar from "../SharedPages/Navbar/Navbar";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm/CheckoutForm";
import Footer from "../SharedPages/Footer/Footer";

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

const Payment = () => {
  return (
    <div>
      <Helmet>
        <title>Payment</title>
      </Helmet>
      <Navbar></Navbar>
      <div className="py-10 bg-gray-100">
        <h2 className="text-3xl font-bold text-center mb-10">
          <em>Payment</em>
        </h2>
        <Elements stripe={stripePromise}>
            <CheckoutForm></CheckoutForm>
        </Elements>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Payment;
