import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../features/cart/addProductslice";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loder from "../Loder";

const SingleProduct = () => {
  const [product, setProduct] = useState();
  const [loding, setLoding] = useState(true);

  const { id } = useParams();
  const dispatch = useDispatch();
  const cartitem = useSelector((state) => state?.cart?.cart);
  const existProduct = cartitem?.filter((item, i) => id == item?.id);

  const notify = () => toast.success("Product Added to Cart");
  const getData = async () => {
    await axios({
      method: "GET",
      url: `https://65d888c7c96fbb24c1bbb9b4.mockapi.io/products`,
    }).then((Response) => {
      const singleProduct = Response?.data.find((data, i) => data.id == id);

      setProduct(singleProduct);
      setLoding(false);
    });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <Navbar />
      {loding ? (
        <Loder />
      ) : (
        <div
          style={{
            margin: "6vw",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: "40%",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "30vw",
                objectFit: "contain",
                marginTop: "4vw",
              }}
            >
              <div
                id="carouselExampleDark"
                className="carousel carousel-dark slide "
              >
                <div className="carousel-indicators">
                  <button
                    type="button"
                    data-bs-target="#carouselExampleDark"
                    data-bs-slide-to="0"
                    className="active"
                    aria-current="true"
                    aria-label="Slide 1"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleDark"
                    data-bs-slide-to="1"
                    aria-label="Slide 2"
                  ></button>
                  <button
                    type="button"
                    data-bs-target="#carouselExampleDark"
                    data-bs-slide-to="2"
                    aria-label="Slide 3"
                  ></button>
                </div>
                <div className="carousel-inner">
                  <div className="carousel-item active" data-bs-interval="10000">
                    <img
                      style={{
                        height: "30vw",
                      }}
                      src={
                        product?.images[0] ||
                        "data:image/png;base64,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"
                      }
                      className="d-block w-100"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item" data-bs-interval="2000">
                    <img
                      style={{
                        height: "30vw",
                      }}
                      src={
                        product?.images[1] ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmirI4PxLNSAAUf4tBZCiZjUtwrpt9oVu6NIshLIdqjNK9wWcjXgtWRr81WMbgJ7HuVlc&usqp=CAU"
                      }
                      className="d-block w-100"
                      alt="..."
                    />
                  </div>
                  <div className="carousel-item">
                    <img
                      style={{
                        height: "30vw",
                      }}
                      src={
                        product?.images[2] ||
                        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmirI4PxLNSAAUf4tBZCiZjUtwrpt9oVu6NIshLIdqjNK9wWcjXgtWRr81WMbgJ7HuVlc&usqp=CAU"
                      }
                      className="d-block w-100"
                      alt="..."
                    />
                  </div>
                </div>
                <button
                  className="carousel-control-prev"
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  type="button"
                  data-bs-target="#carouselExampleDark"
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
            </div>
          </div>
          <div
            style={{
              padding: "5vw 5vw",
              width: "50%",
            }}
          >
            <h3>{product?.title}</h3>
            <p>{product?.description}</p>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
              }}
            >
              <div>
                <h6>{product?.category?.name}</h6>
                <h3>{product?.price}$</h3>
              </div>
              <div>
                {existProduct.length > 0 ? (
                  <Link to="/cart">
                    <button type="button" className="btn btn-outline-success">
                      Go to Cart
                    </button>
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    onClick={() => {
                      dispatch(addToCart(product));
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
      )}
    </>
  );
};

export default SingleProduct;
