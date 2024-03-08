import React, { useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
import Loder from "./Loder";
import Footer from "./Footer";
import Card from "./Card/Card";

const Home = () => {
  const [products, setProducts] = useState();
  // const [offSet, setOffSet] = useState(0);
  // const [canScroll, setCanScroll] = useState(false);

  // const [apiCalled, setApiCalled] = useState(false);
  const [search, setSearch] = useState("");
  const [loding, setLoding] = useState(true);


  const getData = async () => {
    await axios({
      method: "GET",
      url: ` https://65d888c7c96fbb24c1bbb9b4.mockapi.io/products`,
    }).then((Response) => {
      setProducts(Response.data);
      setLoding(false);
    });
  };

  useEffect(() => {
    // setApiCalled(false);
    getData();
  }, []);

  // const InfiniteScroll = async () => {
  //   try {
  //     const scrollY = window.scrollY;
  //     const windowHeight = window.innerHeight;
  //     const documentHeight = document.documentElement.scrollHeight;

  //     const remainingDistanceToFooter =
  //       documentHeight - (scrollY + windowHeight);

  //     if (
  //       canScroll &&
  //       !apiCalled &&
  //       remainingDistanceToFooter > 100 &&
  //       offSet < 50
  //     ) {
  //       if (scrollY + windowHeight + 500 > documentHeight) {
  //         setCanScroll(false);

  //         setOffSet((prev) => prev + 10);

  //         setApiCalled(true);

  //         setTimeout(() => {
  //           setCanScroll(true);
  //         }, 1000);
  //       }
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   if (offSet < 50) {
  //     window.addEventListener("scroll", InfiniteScroll);
  //   }

  //   return () => window.removeEventListener("scroll", InfiniteScroll);
  // }, [apiCalled, canScroll]);

  const filtesredData =
    products &&
    products?.filter(
      (item) =>
        item?.category?.name.toLowerCase().includes(search.toLowerCase()) ||
        item?.title.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <>
      <Navbar search={setSearch} showSearch={true} />
      <div
        style={{
          marginTop: "-4vw",
          position: "fixed",

          width: "100%",
          zIndex: "100",
          backgroundColor: "transparent",
          justifyContent: "flex-end",
          display: "flex",
        }}
      >
        {/* <nav
          className="navbar  "
          style={{
            height: "2vw",
          }}
        >
          <div className="container-fluid">
            <form className="d-flex" role="search">
              {togalSearch ? (
                <input
                  style={{ backgroundColor: "#e6e6e6" }}
                  className="form-control px-5 me-2"
                  type="search"
                  placeholder="Search Product "
                  aria-label="Search"
                  onChange={(e) => setSearch(e.target.value)}
                />
              ) : (
                ""
              )}
              {!togalSearch ? (
                <i
                  style={{
                    fontSize: "1.5vw",
                    marginRight: "2vw",
                    borderRadius: "50%",
                  }}
                  className="ri-search-line btn btn-outline-success"
                  onClick={() => setTogalSearch(true)}
                ></i>
              ) : (
                <i
                  style={{
                    fontSize: "1.5vw",
                    marginRight: "2vw",
                    borderRadius: "50%",
                  }}
                  className="ri-close-line btn btn-outline"
                  onClick={() => {
                    setTogalSearch(false);
                    setSearch("");
                  }}
                ></i>
              )}
            </form>
          </div>
        </nav> */}
      </div>
      <div
        id="carouselExampleAutoplaying"
        className="carousel slide"
        data-bs-ride="carousel"
        style={{
          marginTop: "10vw",
          paddingTop: "2vw",
        }}
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/4/10/7feef02b-0072-4c1b-b83d-4e46a5d93c6b1649530621162-Sangria_Desk_Banner.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/5/3/a20271c6-249f-480b-bcc7-1b150516e54e1651599573998-Dressberry_Desk.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
          <div className="carousel-item">
            <img
              src="https://assets.myntassets.com/w_980,c_limit,fl_progressive,dpr_2.0/assets/images/2022/4/17/744f6742-7705-45a9-b555-892c309b36cd1650181498588-Premium-Collection_Desk.jpg"
              className="d-block w-100"
              alt="..."
            />
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleAutoplaying"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      <h2
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "center",
          margin: "5vw 0vw",
        }}
      >
        All Products
      </h2>

      {loding ? <Loder /> : <Card data={filtesredData} />}
      <Footer />
    </>
  );
};

export default Home;
