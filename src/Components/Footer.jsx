import React from "react";
import "./Footer.css"; // Import your existing CSS file


const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="rajs">
          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li>
                <p>About us</p>
              </li>
              <li>
                <p>Our services</p>
              </li>
              <li>
                <p>Privacy policy</p>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Get Help</h4>
            <ul>
              <li>
                <p>FAQ</p>
              </li>
              <li>
                <p>Shipping</p>
              </li>
              <li>
                <p>Returns</p>
              </li>
              <li>
                <p>Order status</p>
              </li>
              <li>
                <p>Payment options</p>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Online Shop</h4>
            <ul>
              <li>
                <p >Mens</p>
              </li>
              <li>
                <p >Womens</p>
              </li>
              <li>
                <p>Jewellery </p>
              </li>
              <li>
                <p >Electronics</p>
              </li>
            </ul>
          </div>
          <div className="footer-col">
            <h4>Follow Us</h4>
            <div className="social-links">
              <p>
                <i className="fab fa-facebook-f"></i>
              </p>
              <p>
                <i className="fab fa-twitter"></i>
              </p>
              <p>
                <i className="fab fa-instagram"></i>
              </p>
              <p>
                <i className="fab fa-linkedin-in"></i>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
