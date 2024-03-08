import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import Loder from "../Loder";
import Footer from "../Footer";
import Card from "../Card/Card";

const Electronics = () => {
  const [products, setProducts] = useState();
  const [loding, setLoding] = useState(true);

  const getData = async () => {
    await axios({
      method: "GET",
      url: "https://65d888c7c96fbb24c1bbb9b4.mockapi.io/products",
    }).then((Response) => {
      const electronics = Response?.data.filter(
        (data, i) => data.category.id === 2
      );
    
      setProducts(electronics);
      setLoding(false);
    });
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <Navbar />

      {loding ? <Loder /> : <Card data={products} />}
      <Footer />
    </>
  );
};

export default Electronics;
