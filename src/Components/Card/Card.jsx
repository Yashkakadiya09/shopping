import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { addToCart } from "../../features/cart/addProductslice";

const Card = ({ data }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartitem = useSelector((state) => state?.cart?.cart);
  const notify = () => toast.success("Product Added to Cart");
 
  return (
    <>
      <div
        style={{
          width: "100%",
          padding: "1vw",
          marginTop: "5vw",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
        }}
      >
        {data?.map((data, i) => {
          const existProduct = cartitem?.filter(
            (item, i) => data?.id === item?.id
          );

          return (
            <div
              style={{
                width: "20%",
                height: "25vw",

                margin: "2vw",
                padding: "1vw",
                borderRadius: "30px",
                border: "1px solid #F0F8FF ",
                boxShadow: "5px 5px 30px #bfbfbf",
              }}
              onClick={() => navigate(`/singleProduct/${data?.id}`)}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <img
                  style={{
                    height: "13vw",
                    objectFit: "contain",
                    maxWidth: "100%",
                  }}
                  src={data?.images[0]}
                  alt=""
                />
              </div>
              <div
                style={{
                  marginTop: ".3vw",
                }}
              >
                <p
                  style={{
                    width: "100%",
                    height: "3.2vw",
                    overflow: "hidden",
                  }}
                >
                  {data?.title}
                </p>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <h6>{data?.category?.name}</h6>
                    <h5>{data?.price}$</h5>
                  </div>
                  <div>
                    <h6>10% Off</h6>
                    {existProduct.length > 0 ? (
                      <button
                        type="button"
                        className="btn btn-outline-success"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate("/cart");
                        }}
                      >
                        Go to Cart
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="btn btn-outline-primary"
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(addToCart(data));
                          notify();
                        }}
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Card;
