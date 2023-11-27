import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useLoaderData, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/AuthProvider";
import moment from "moment/moment";
import Swal from "sweetalert2";

const CheckoutForm = () => {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const { _id, name, contestPrice, participated, status, email} = useLoaderData();
  const totalPrice = parseFloat(contestPrice).toFixed(2);

  useEffect(() => {
    axiosSecure
      .post("/create-payment-intent", { price: totalPrice })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosSecure, totalPrice]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card === null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(error.message);
    } else {
      console.log("payment method:", paymentMethod);
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      console.log("Confirm error");
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        const confirmation = status;
        const oldCount = parseInt(participated);
        const newCount = oldCount + 1;
        const updatedCount = {newCount, confirmation};

        const register = {
          name: user.displayName,
          email: user.email,
          creatorEmail: email,
          contestName: name,
          transactionId: paymentIntent.id,
          price: totalPrice,
          date: moment().format("L"),
          contestId: _id,
          winner: "Pending",
        };
        const res = await axiosSecure.post("/registers", register);
        if (res.data.insertedId) {
          Swal.fire({
            title: "Good job!",
            text: "You have been registered!",
            icon: "success",
          });
        }

        axiosSecure.patch(`/contests/${_id}`, updatedCount)
        .then(res => {
          console.log(res.data);
        })

        navigate("/allContest");
      }
    }
  };
  return (
    <div className="md:w-1/2 2xl:w-2/5 mx-auto mt-10">
      <p className="text-lg font-bold text-center mb-3">
        Cost: ${contestPrice}
      </p>
      <form onSubmit={handleSubmit}>
        <CardElement
          className="py-3 px-2"
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <div className="w-max mx-auto mt-10">
          <button
            className="btn bg-green-600 hover:bg-green-700 text-white px-20"
            type="submit"
            disabled={!stripe || !clientSecret}
          >
            Pay
          </button>
        </div>
        <p className="font-bold text-center text-red-600">{error}</p>
        {transactionId && (
          <p className="font-bold text-center text-green-600">
            Your transaction id: {transactionId}
          </p>
        )}
      </form>
    </div>
  );
};

export default CheckoutForm;
