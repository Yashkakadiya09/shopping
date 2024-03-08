import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderPlaced } from "../features/cart/addProductslice";
import {  useNavigate } from "react-router-dom";
import tenorunscreen from "../Assets/tenor-unscreen.gif";
import { toast } from "react-toastify";
import axios from "axios";

const PaymentPage = () => {
  const [congratulation, setCongratulation] = useState(false);
  const [loading, setLoading] = useState(false);

  const cartitem = useSelector((state) => state?.cart?.cart);

  let allTotal = 0;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const order = () => toast.success("Order Placed");
  const [user, setUser] = useState();

  cartitem?.map(
    (data) => (allTotal = allTotal + Math.round(data?.quantity * data?.price))
  );
  const header = { "Access-Control-Allow-Origin": "*" };

  const fetchUser = async () => {
    let responce = localStorage.getItem("user");
    let data = JSON.parse(responce);
    setUser(data[0]);
  };
  useEffect(() => {
    fetchUser();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, "0");
    var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
    var yyyy = today.getFullYear();

    today = mm + "/" + dd + "/" + yyyy;

    try {
       await axios.post(
        "https://654c6f6e77200d6ba858d7cc.mockapi.io/yash",
        {
          userid: user?.id,
          orderitem: cartitem,
          orderdate: today,
          header: header,
        }
      );
    } catch (error) {
      // correctlogin("Something Went Wrong");
    }

    setCongratulation(true);

    setTimeout(() => {
      setCongratulation(false);
      setLoading(false);
    }, 2000);
    order();

    setTimeout(() => {
      navigate("/home");
      dispatch(orderPlaced());
    }, 2500);
  };
  //
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "40vw",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h4>
          Total Order Value :-<span>{allTotal}</span>
        </h4>

        {loading ? (
          <button className="btn btn-success px-4 py-0 " disabled>
            <div className="spinner-border text-light py-1" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </button>
        ) : (
          <button
            className="btn btn-outline-success"
            onClick={(e) => handleSubmit(e)}
          >
            {" "}
            Place Order
          </button>
        )}
      </div>
      {congratulation ? (
        <div
          style={{
            width: "100%",
            position: "fixed",
            top: "1px",
            height: "45vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            style={{
              width: "40%",
            }}
            src={tenorunscreen}
            alt=""
          />
        </div>
      ) : (
        ""
      )}
      {/* <div
        style={{
          width: "100%",
          position: "fixed",
          top: "1px",
          height: "45vw",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            width: "25vw",
            height: "15vw",
            backgroundColor: " #cceeff",
            borderRadius: "30px",
            boxShadow: "1px 1px 20px 10px #d9d9d9  ",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection:"column"
          }}
        >
          <h6>Congratiulation</h6>
          <h6>
            <Link to={"/home"}>
              Go Back To <span style={{ color: "green" }}>Home</span>
            </Link>
          </h6>
        </div>
      </div> */}
    </>
  );
};

export default PaymentPage;
