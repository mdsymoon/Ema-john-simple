import React from "react";
import { useForm } from "react-hook-form";
import "./Shipment.css";
import { UserContext } from "./../../App";
import { useContext } from "react";
import { getDatabaseCart, processOrder } from "../../utilities/databaseManager";

const Shipment = () => {
  const [loggedInUser, setloggedInUser] = useContext(UserContext);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const savedCart = getDatabaseCart();
    const orderDetails = {
      ...loggedInUser,
      products: savedCart,
      shipment: data,
      orderTime: new Date(),
    };

    fetch("https://whispering-hamlet-71127.herokuapp.com/addOrder", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderDetails),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          processOrder();
          alert("order successful");
        }
      });
  };

  return (
    <form className="form-style" onSubmit={handleSubmit(onSubmit)}>
      <input
        defaultValue={loggedInUser.name}
        {...register("name", { required: true })}
        placeholder="Your Name"
      />
      {errors.name && <span className="error">Name is required</span>}

      <input
        defaultValue={loggedInUser.email}
        {...register("email", { required: true })}
        placeholder="Your Email"
      />
      {errors.email && <span className="error">Email is required</span>}

      <input
        {...register("number", { required: true })}
        placeholder="Your Number"
      />
      {errors.number && <span className="error">Number is required</span>}

      <input
        {...register("address", { required: true })}
        placeholder="Your Address"
      />
      {errors.address && <span className="error">Address is required</span>}

      <input
        {...register("Country", { required: true })}
        placeholder="Your Country"
      />
      {errors.Country && <span className="error">Country is required</span>}

      <input className="submit" type="submit" />
    </form>
  );
};

export default Shipment;
