import { useDispatch, useSelector } from "react-redux";
import Navbar from "./Navbar";
import {
  incrementProduct,
  reduceProduct,
  removeProduct,
} from "../features/cart/addProductslice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cartitem = useSelector((state) => state?.cart?.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

 
  let allTotal = 0;
  const handleCart = (e) => {
    navigate("/cart/checkout");
  };

  return (
    <>
      <Navbar />

      {cartitem.length > 0 ? (
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: "3vw",
          }}
        >
          <div
            style={{
              marginTop: "6vw",
              display: "flex",
              flexDirection: "column",
              width: "50%",
            }}
          >
            {cartitem?.map((data, i) => {
              allTotal = allTotal + Math.round(data?.quantity * data?.price);
              let newTitle = data?.title?.slice(0, 29);
              return (
                <>
                  <div
                    style={{
                      borderRadius: "10px",
                      margin: "1vw 5vw",
                      width: "70%",
                      gap: ".4vw",
                      height: "10vw",
                      border: "1px solid #e6e6e6",
                      boxShadow: "1px 1px 20px #cccccc",
                      display: "flex",
                      padding: "1vw 1vw",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                      }}
                    >
                      <img
                        style={{
                          height: "100%",
                          maxWidth: "5vw",
                          objectFit: "contain",
                          
                        }}
                        src={data?.images[0]}
                        alt=""
                      />
                    </div>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "100%",
                        }}
                      >
                        <h6
                          style={{
                            width: "10vw",
                          }}
                        >
                          {data?.category?.name}
                        </h6>

                        <i
                          style={{
                            marginLeft: "15vw",
                            color: "red",
                            fontSize: "1.5vw",
                          }}
                          className="ri-delete-bin-fill "
                          onClick={() => dispatch(removeProduct(data?.id))}
                        ></i>
                      </div>

                      <p title={data?.title}>{newTitle}...</p>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <h6>
                            $ {data?.price}{" "}
                            <span
                              style={{
                                fontSize: ".8vw",
                              }}
                            >
                              (per Item)
                            </span>
                          </h6>
                        </div>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-around",
                            border: "1px solid #e6e6e6",
                            width: "8vw",
                          }}
                        >
                          <button
                            type="button"
                            className="btn btn-outline"
                            onClick={() => dispatch(reduceProduct(data?.id))}
                          >
                            -
                          </button>
                          <h6
                            style={{
                              marginTop: ".5vw",
                            }}
                          >
                            {data?.quantity}
                          </h6>
                          <button
                            type="button"
                            className="btn btn-outline"
                            onClick={() => dispatch(incrementProduct(data?.id))}
                          >
                            <i className="ri-add-line"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
          <div
            style={{
              marginTop: "5vw",
              width: "49%",
              padding: "1vw",
            }}
          >
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">Product</th>
                  <th scope="col">Price($)</th>
                  <th scope="col">Qty.</th>
                  <th scope="col">Total($)</th>
                </tr>
              </thead>
              <tbody>
                {cartitem?.map((data, i) => {
                  let newTitle = data?.title?.slice(0, 10);
                  return (
                    <tr>
                      <td
                        title={data?.title}
                       
                        style={{
                          width: "10vw",

                          overflow: "hidden",
                        }}
                      >
                        {newTitle}...
                      </td>
                      <td>{data?.price}$</td>
                      <td>{data?.quantity}</td>
                      <td>{Math.round(data?.quantity * data?.price)}$</td>
                    </tr>
                  );
                })}
                <tr>
                  <th colspan="3">Total Amount</th>
                  <td>{allTotal}$</td>
                </tr>
              </tbody>
            </table>
            <button
              type="button"
              className="btn btn-info"
              onClick={(e) => {
                handleCart(e);
              }}
            >
              Check Out
            </button>
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "85vh",
            fontSize: "8vw",
          }}
        >
          <p
            style={{
              color: "	#BEBEBE",
            }}
          >
            Cart Is Empty
          </p>
        </div>
      )}
    </>
  );
};

export default Cart;
