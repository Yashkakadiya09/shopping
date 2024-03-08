import axios from "axios";
import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  let message = (msg) => toast.warning(msg);
  let success = (msg) => toast.success(msg);

  const header = { "Access-Control-Allow-Origin": "*" };
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handelsubmit = async (e) => {
    e.preventDefault();
    if (email === "" || name === "" || password === "") {
      message("Please enter all details");
    } else if (password.length < 6) {
      message("Please enter a strong password");
    } else if (!validateEmail(email)) {
      message("Please enter a valid email address");
    } else {
      setLoading(true);
      try {
        await axios.post("https://654c6f6e77200d6ba858d7cc.mockapi.io/login", {
          name: name,
          email: email,
          password: password,
          header: header,
        });
        setEmail("");
        setName("");
        setPassword("");
        setLoading(false);
        success("sucessfully created");
        Navigate("/");
      } catch (error) {
        console.error("Error submitting data:", error);
      }
    }
  };

  return (
    <>
      <section
        id="login"
        style={{
          height: "60vw",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <div
          className="container "
          style={{
            marginTop: "6vw",
          }}
        >
          <div className="row justify-content-sm-center h-100">
            <div className="col-xxl-4 col-xl-5 col-lg-5 col-md-7 col-sm-9">
              <div className="card shadow-lg">
                <div className="card-body p-5">
                  <div className="text-end ">
                    <img
                      src="https://i.ibb.co/G3npnbk/shopping2.jpg"
                      alt="logo"
                    />
                  </div>
                  <h1 className="fs-4 card-title fw-bold mb-4">Register</h1>
                  <form>
                    <div className="mb-3">
                      <label className="mb-2 text-muted" htmlFor="name">
                        Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        className="form-control"
                        name="name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        autofocus
                      />
                      <div className="invalid-feedback">Name is required</div>
                    </div>

                    <div className="mb-3">
                      <label className="mb-2 text-muted" htmlFor="email">
                        E-Mail Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                      />
                      <div className="invalid-feedback">Email is invalid</div>
                    </div>

                    <div className="mb-3">
                      <label className="mb-2 text-muted" htmlFor="password">
                        Password
                      </label>
                      <input
                        id="password"
                        type="password"
                        className="form-control"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        required
                      />
                      <div className="invalid-feedback">Password is required</div>
                    </div>

                    <p className="form-text text-muted mb-3">
                      By registering you agree with our terms and condition.
                    </p>

                    <div className="align-items-center d-flex">
                      {loading ? (
                        <button
                          className="btn btn-success px-4 py-0 ms-auto"
                          disabled
                        >
                          <div
                            className="spinner-border text-light py-1"
                            role="status"
                          >
                            <span className="visually-hidden">Loading...</span>
                          </div>
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="btn btn-success ms-auto"
                          onClick={(e) => handelsubmit(e)}
                        >
                          Register
                        </button>
                      )}
                    </div>
                  </form>
                </div>
                <div className="card-footer py-3 border-1">
                  <Link to="/">
                    <div className="text-center">
                      Already have an account?
                      <span className="text-dark">Login</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Signup;
