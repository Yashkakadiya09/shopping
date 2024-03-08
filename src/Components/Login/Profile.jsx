import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../Navbar";
import axios from "axios";
import { useDispatch } from "react-redux";
import { orderPlaced } from "../../features/cart/addProductslice";

const Profile = () => {
  const [user, setUser] = useState();
  const [list, setList] = useState({
    profile: true,
    adress: false,
    order: false,
  });
  const header = { "Access-Control-Allow-Origin": "*" };

  const [addAddress, setAddAddress] = useState(false);
  const [orderItem, setOrderItem] = useState([]);
  const dispatch = useDispatch();
  const [localAddress, setLocalAddress] = useState([]);
  const [addressObj, setAddressObj] = useState({
    first: "",
    last: "",
    landmark: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    mobile: "",
  });
  const notify = () => toast.error("Please Fill All Details");
  const navigate = useNavigate();
  const handleObj = (e) => {
    let { name, value } = e.target;
    setAddressObj({
      ...addressObj,
      [name]: value,
    });
  };
  const getOrderItem = async (userId) => {
    try {
      const res = await axios.get(
        "https://654c6f6e77200d6ba858d7cc.mockapi.io/yash"
      );
      let findExistUserData = res?.data.filter(
        (data, i) => data?.userid === userId
      );
      let array = [];

      for (let i = 0; i < findExistUserData.length; i++) {
        const element = findExistUserData[i];
        element?.orderitem.forEach((item, i) => {
          let orderper = {
            orderdate: element?.orderdate,
            ...item,
          };
          array.push(orderper);
        });
      }
      setOrderItem(array.reverse());
    } catch (error) {
      alert("Something Went Wrong");
    }
    try {
      const res = await axios.get(
        "https://65d888c7c96fbb24c1bbb9b4.mockapi.io/address"
      );
      const adress = res?.data.filter((data) => data.userid === userId);
      setLocalAddress(adress);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    let responce = localStorage.getItem("user");
    let data = JSON.parse(responce);
    setUser(data[0]);

    getOrderItem(data[0]?.id);
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmpty = Object.values(addressObj).some((value) => value === "");
    if (isEmpty) {
      notify();
    } else {
      setLocalAddress([addressObj]);
      try {
        await axios.post(
          "https://65d888c7c96fbb24c1bbb9b4.mockapi.io/address",
          {
            first: addressObj.first,
            last: addressObj.last,
            landmark: addressObj.landmark,
            address: addressObj.address,
            city: addressObj.city,
            state: addressObj.state,
            zip: addressObj.zip,
            mobile: addressObj.mobile,
            userid: user.id,
            header: header,
          }
        );
      } catch (error) {
        console.error("Error submitting data:", error);
      }
    }
  };
  return (
    <>
      <Navbar />
      {
        <div
          style={{
            marginTop: "10vw",
          }}
        >
          <section style={{ backgroundColor: "#eee" }}>
            <div className="container py-5">
              <div className="row">
                <div
                  className="card mb-4 col-lg-3  mb-lg-3"
                  style={{ height: "15vw" }}
                >
                  <div className="card-body p-0 ">
                    <ul
                      className="list-group list-group-flush rounded-3 "
                      style={{
                        cursor: "pointer",
                      }}
                    >
                      <li
                        className="list-group-item d-flex justify-content-start  align-items-center p-3"
                        onClick={() =>
                          setList({
                            adress: false,
                            order: false,
                            profile: !list?.profile,
                          })
                        }
                      >
                        <i className="ri-profile-fill mx-2 fa-lg"></i>
                        <p className="mb-0">Profile</p>
                      </li>
                      <li
                        className="list-group-item d-flex justify-content-start align-items-center p-3"
                        onClick={() =>
                          setList({
                            profile: false,
                            order: false,
                            adress: !list?.adress,
                          })
                        }
                      >
                        <i className="ri-map-pin-line fa-lg mx-2"></i>

                        <p className="mb-0">Adress</p>
                      </li>
                      <li
                        className="list-group-item d-flex justify-content-start align-items-center p-3"
                        onClick={() =>
                          setList({
                            adress: false,
                            profile: false,
                            order: !list?.order,
                          })
                        }
                      >
                        <i className="ri-list-ordered fa-lg mx-2"></i>
                        <p className="mb-0">Last Order</p>
                      </li>
                    </ul>
                  </div>
                </div>
                {list?.profile ? (
                  <div className="col-lg-9">
                    <div
                      className="card mb-6"
                      style={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <div className="card-body text-center">
                        <div className="d-flex justify-content-end mb-2 ">
                          <Link
                            to={"/"}
                            onClick={() => {
                              dispatch(orderPlaced());
                              localStorage.setItem("user", null);
                            }}
                            className=" m-2 "
                            style={{
                              color: "black",
                            }}
                          >
                            <i className="ri-logout-circle-line fa-lg"></i>
                            <span>Log out</span>
                          </Link>
                        </div>
                        <img
                          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                          alt="avatar"
                          className="rounded-circle img-fluid"
                          style={{ width: "100px" }}
                        />
                        <h5 className="my-3">{user?.name}</h5>
                        <p className="text-muted mb-1">{user?.email}</p>
                        {/* <p className="text-muted mb-4">
                        Bay Area, San Francisco, CA
                      </p> */}
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
                {list?.adress ? (
                  <div className="col-lg-9">
                    <div className="card mb-4">
                      <div className="card-body">
                        {localAddress.length > 0 ? (
                          localAddress?.map((data, i) => {
                            return (
                              <>
                                <h4
                                  style={{
                                    margin: "2vw 0vw ",
                                  }}
                                >
                                  ADDRESS {i + 1}
                                </h4>
                                <div className="row">
                                  <div className="col-sm-3">
                                    <p className="mb-0">Full Name</p>
                                  </div>
                                  <div className="col-sm-9">
                                    <p className="text-muted mb-0">
                                      {data?.first} {localAddress?.last}
                                    </p>
                                  </div>
                                </div>
                                <hr />
                                <div className="row">
                                  <div className="col-sm-3">
                                    <p className="mb-0">Email</p>
                                  </div>
                                  <div className="col-sm-9">
                                    <p className="text-muted mb-0">
                                      {user?.email}
                                    </p>
                                  </div>
                                </div>
                                <hr />
                                <div className="row">
                                  <div className="col-sm-3">
                                    <p className="mb-0">Mobile</p>
                                  </div>
                                  <div className="col-sm-9">
                                    <p className="text-muted mb-0">
                                      {data?.mobile}
                                    </p>
                                  </div>
                                </div>
                                <hr />
                                <div className="row">
                                  <div className="col-sm-3">
                                    <p className="mb-0">Phone</p>
                                  </div>
                                  <div className="col-sm-9">
                                    <p className="text-muted mb-0">
                                      {data?.phone}
                                    </p>
                                  </div>
                                </div>
                                <hr />
                                <div className="row">
                                  <div className="col-sm-3">
                                    <p className="mb-0">Address</p>
                                  </div>
                                  <div className="col-sm-9">
                                    <p className="text-muted mb-0">
                                      {data?.address}, {data?.city},
                                      {data?.state}- {data?.zip}
                                    </p>
                                  </div>
                                </div>
                              </>
                            );
                          })
                        ) : (
                          <>
                            <button
                              className="btn btn-success"
                              onClick={() => setAddAddress(!addAddress)}
                            >
                              Add Address
                            </button>
                            {addAddress ? (
                              <>
                                <form className="row g-3 my-3">
                                  <div className="col-md-6">
                                    <label for="First" className="form-label">
                                      First Name
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="First"
                                      name="first"
                                      value={addressObj.first}
                                      onChange={(e) => handleObj(e)}
                                      placeholder="Enter First Name"
                                    />
                                  </div>

                                  <div className="col-md-6">
                                    <label for="Last" className="form-label">
                                      Last Name
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="Last"
                                      name="last"
                                      placeholder="Enter Last Name"
                                      value={addressObj.last}
                                      onChange={(e) => handleObj(e)}
                                    />
                                  </div>

                                  <div className="col-md-6">
                                    <label
                                      for="LandMark"
                                      className="form-label"
                                    >
                                      Landmark
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="LandMark"
                                      name="landmark"
                                      placeholder="Enter LandMark"
                                      value={addressObj.landmark}
                                      onChange={(e) => handleObj(e)}
                                    />
                                  </div>

                                  <div className="col-md-6">
                                    <label for="Address" className="form-label">
                                      Address{" "}
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="Address"
                                      name="address"
                                      placeholder="Enter  Address"
                                      value={addressObj.address}
                                      onChange={(e) => handleObj(e)}
                                    />
                                  </div>

                                  <div className="col-md-4">
                                    <label
                                      for="inputCity"
                                      className="form-label"
                                    >
                                      City
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="inputCity"
                                      placeholder="Enter City Name"
                                      name="city"
                                      value={addressObj.city}
                                      onChange={(e) => handleObj(e)}
                                    />
                                  </div>

                                  <div className="col-md-4">
                                    <label for="State" className="form-label">
                                      State
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="State"
                                      placeholder="Enter State Name"
                                      name="state"
                                      value={addressObj.state}
                                      onChange={(e) => handleObj(e)}
                                    />
                                  </div>

                                  <div className="col-md-4">
                                    <label for="Zip" className="form-label">
                                      Zip Code
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="Zip"
                                      name="zip"
                                      minLength={6}
                                      placeholder="Enter  Zip Code"
                                      value={addressObj.zip}
                                      onChange={(e) => handleObj(e)}
                                    />
                                  </div>
                                  <div className="col-md-6">
                                    <label for="Mobile" className="form-label">
                                      Mobile Number
                                    </label>
                                    <input
                                      type="text"
                                      className="form-control"
                                      id="Mobile"
                                      name="mobile"
                                      placeholder="Enter   Mobile Number"
                                      value={addressObj.mobile}
                                      onChange={(e) => handleObj(e)}
                                    />
                                  </div>

                                  <div className="col-12">
                                    <button
                                      type="submit"
                                      className="btn btn-primary"
                                      onClick={(e) => handleSubmit(e)}
                                    >
                                      Save
                                    </button>
                                  </div>
                                </form>
                              </>
                            ) : (
                              ""
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}

                {list?.order ? (
                  <div className="col-lg-9">
                    <div className="card mb-4">
                      <div className="card-body">
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <h5>Order List</h5>
                          {orderItem.length > 0 ? (
                            orderItem?.map((data) => {
                              return (
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
                                  onClick={() =>
                                    navigate(`/singleProduct/${data?.id}`)
                                  }
                                >
                                  <div
                                    style={{
                                      display: "flex",
                                    }}
                                  >
                                    <img
                                      style={{
                                        height: "100%",
                                        maxWidth: "10vw",
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
                                      <p
                                        style={{
                                          marginLeft: "10vw",
                                        }}
                                      >
                                        {data?.orderdate}
                                      </p>
                                    </div>

                                    <p title={data?.title}>{data?.title}</p>
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
                                    </div>
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <div
                              style={{
                                width: "100%",
                                height: "15vw",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                flexDirection: "column",
                              }}
                            >
                              <h6>Order List Is Empty </h6>
                              <br />
                              <h6>
                                <Link to={"/home "}>
                                  Go to{" "}
                                  <span style={{ color: "green" }}>
                                    Shopping
                                  </span>
                                </Link>
                              </h6>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </section>
        </div>
      }
    </>
  );
};

export default Profile;
