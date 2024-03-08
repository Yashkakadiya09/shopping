import React from "react";
import "./Footer.css"; // Import your existing CSS file
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="rajs">
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li>
                <a>About us</a>
              </li>
              <li>
                <a>Our services</a>
              </li>
              <li>
                <a>Privacy policy</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Get Help</h4>
            <ul>
              <li>
                <a>FAQ</a>
              </li>
              <li>
                <a>Shipping</a>
              </li>
              <li>
                <a>Returns</a>
              </li>
              <li>
                <a>Order status</a>
              </li>
              <li>
                <a>Payment options</a>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Online Shop</h4>
            <ul>
              <li>
                <Link to={"/menwear"}>Mens</Link>
              </li>
              <li>
                <Link to={"/womenwear"}>Womens</Link>
              </li>
              <li>
                <Link to={"/jewelery"}>Jewellery </Link>
              </li>
              <li>
                <Link to={"electronics"}>Electronics</Link>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Follow Us</h4>
            <div className="social-links">
              <a>
                <i className="fab fa-facebook-f"></i>
              </a>
              <a>
                <i className="fab fa-twitter"></i>
              </a>
              <a>
                <i className="fab fa-instagram"></i>
              </a>
              <a>
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
