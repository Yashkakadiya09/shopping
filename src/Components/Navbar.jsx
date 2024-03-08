import React from "react";
import { useSelector } from "react-redux";

import { Link } from "react-router-dom";

const Navbar = ({ search, showSearch }) => {
  const cartitem = useSelector((state) => state?.cart?.cart);
  return (
    <>
      <nav
        className="navbar fixed-top navbar-expand-lg "
        style={{
          backgroundColor: "#e3f2fd",
        }}
      >
        <div className="container-fluid">
          <Link className="navbar-brand" to="/home">
            <div className="container px-5">
              <img
                src="https://i.ibb.co/dDZLm0D/shopping-removebg-preview3.png"
                alt="Bootstrap"
                width="55"
                height="50"
              />
            </div>
          </Link>

          <div
            className="collapse navbar-collapse"
            id="navbarSupportedContent"
            style={{
              marginTop: "1.5vw",
            }}
          >
            <ul className="navbar-nav me-auto mb-2 mb-lg-0  ">
              <li className="nav-item">
                <Link
                  className="nav-link active text-reset mx-1 fw-bold"
                  aria-current="page"
                  to="/home"
                >
                  HOME
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-reset mx-1 "
                  aria-current="page"
                  to="/clothes"
                >
                  CLOTHES
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-reset mx-1  "
                  aria-current="page"
                  to="/furniture"
                >
                  FURNITURE
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link  text-reset mx-1 "
                  aria-current="page"
                  to="/shoes"
                >
                  SHOES
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link text-reset mx-1 "
                  aria-current="page"
                  to="/electronics"
                >
                  ELECTRONICS
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link  text-reset mx-1 "
                  aria-current="page"
                  to="/miscellaneous"
                >
                  MISCELLANEOUS
                </Link>
              </li>
            </ul>
            {showSearch ? (
              <form className="d-flex mx-2">
                <input
                  className="form-control me-2"
                  type="text"
                  placeholder="Search"
                  onChange={(e) => search(e.target.value)}
                  style={{
                    backgroundColor: "#f2f2f2",
                    border: "1px solid #a6a6a6",
                    color: "black",
                  }}
                />
                <button className="btn btn-outline-success" type="submit">
                  Search
                </button>
              </form>
            ) : (
              ""
            )}
            <Link to="/cart" className="mx-4">
              <i
                style={{
                  fontSize: "2vw",
                  borderRadius: "50%",
                  color: "#3399ff",
                }}
                className="ri-shopping-cart-2-line  "
              >
                <sup
                  style={{
                    verticalAlign: "revert",
                    padding: ".05vw .3vw",
                    color: "white",
                    borderRadius: "50%",
                    backgroundColor: "#3399ff",
                    fontSize: "1vw",
                  }}
                >
                  {cartitem?.length}
                </sup>
              </i>
            </Link>
            <Link
              style={{
                padding: ".5vw .7vw",
              }}
              className=" rounded-circle "
              to={"/profile"}
            >
              <span>
                <i
                  style={{
                    fontSize: "2vw",
                    color: "black",
                  }}
                  className="ri-user-line"
                ></i>
              </span>
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
