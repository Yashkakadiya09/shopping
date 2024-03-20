import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [data, setData] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  let correctlogin = (msg) => toast.error(msg);
  let login = (msg) => toast.success(msg);

  const getdetails = async () => {
    try {
      const res = await axios.get(
        "https://654c6f6e77200d6ba858d7cc.mockapi.io/login"
      );
      setData(res.data);
    } catch (error) {
      correctlogin("Something Went Wrong");
    
    }
    

  };
  useEffect(() => {
    getdetails();
  }, []);

  const checkdetails = (e) => {
    e.preventDefault();

    const founduser = data.find(
      (user) => user.email === email && user.password === password
    );

    if (founduser) {
      login("Login Successfully");
      setEmail("");
      setPassword("");
      navigate("/home");

      localStorage.setItem("user", JSON.stringify([founduser]));
    } else {
      correctlogin("please enter correct login Details");
    }
  };

  return (
    <>
      <section
        id="login"
        style={{
          height: "100vh",
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
          <div className="row justify-content-sm-center h-100 ">
            <div className="col-xxl-4 col-xl-5 col-lg-5  ">
              <div className="card shadow-lg">
                <div className="card-body px-5">
                  <div className="text-end ">
                    <img
                      src="https://i.ibb.co/G3npnbk/shopping2.jpg"
                      alt="logo"
                    />
                  </div>
                  <h1 className="fs-4 card-title fw-bold mb-4">Login</h1>
                  <form>
                    <div className="mb-3">
                      <label className="mb-2 text-muted" htmlFor="email">
                        E-Mail Address
                      </label>
                      <input
                        id="email"
                        type="email"
                        className="form-control"
                        name="email"
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autofocus
                      />
                      <div className="invalid-feedback">Email is invalid</div>
                    </div>

                    <div className="mb-3">
                      <div className="mb-2 w-100">
                        <label className="text-muted" htmlFor="password">
                          Password
                        </label>
                      </div>
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        name="password"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                      <div className="invalid-feedback">
                        Password is required
                      </div>
                    </div>

                    <div className="d-flex align-items-center">
                      <div className="form-check">
                        <input
                          type="checkbox"
                          name="remember"
                          id="remember"
                          className="form-check-input"
                          onChange={() => setShowPassword(!showPassword)}
                        />
                        <label htmlFor="remember" className="form-check-label">
                          Show Password
                        </label>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-success ms-auto"
                        onClick={(e) => checkdetails(e)}
                      >
                        Login
                      </button>
                    </div>
                  </form>
                </div>
                <div
                  className="card-footer py-3 border-1"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Link to="/signup">
                    <div className="text-center">
                      Don't have an account?
                      <span className="text-dark">Create One</span>
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

export default Login;
