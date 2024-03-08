import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const CheckOut = () => {
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
  const [newAddress, setNewAddress] = useState(true);
  const [localAddress, setLocalAddress] = useState([]);
  const header = { "Access-Control-Allow-Origin": "*" };
  let responce = localStorage.getItem("user");
  let data = JSON.parse(responce);
  let userid = data[0].id;

  const navigate = useNavigate();
  const handleObj = (e) => {
    setNewAddress(true);
    let { name, value } = e.target;
    setAddressObj({
      ...addressObj,
      [name]: value,
    });
  };
  const getData = async () => {
    try {
      const res = await axios.get(
        "https://65d888c7c96fbb24c1bbb9b4.mockapi.io/address"
      );
      const adress = res?.data.filter((data) => data.userid === userid);
      setLocalAddress(adress);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isEmpty = Object.values(addressObj).some((value) => value === "");
    if (isEmpty) {
      toast.error("Please fill in all fields");
    } else {
      if (newAddress) {
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
              userid: userid,
              header: header,
            }
          );
        } catch (error) {
          console.error("Error submitting data:", error);
        }
      }

      navigate("/cart/checkout/payment");
    }
  };
  const handleLocalAddress = (e, i) => {
    if (e.target.checked) {
      setAddressObj(localAddress[i]);
      setNewAddress(false);
    } else {
      setAddressObj({
        first: "",
        last: "",
        landmark: "",
        address: "",
        city: "",
        state: "",
        zip: "",
        mobile: "",
      });
      setNewAddress(true);
    }
  };

  return (
    <>
      <div
        style={{
          margin: "5vw",
          borderRadius: "20px",
          padding: "2vw",
          boxShadow: "1px 1px 50px 10px  #cccccc",
        }}
      >
        <div className="card-header py-2 d-flex">
          <h5 className="mb-0 text-font text-uppercase mx-4">
            Delivery address
          </h5>
          {localAddress.length > 0 && (
            <div
              style={{
                overflowX: "scroll",
                overflowY: "hidden",
                display: "flex",
                gap: "2vw",
                width: "50%",
                height: "10vw",
              }}
            >
              {localAddress &&
                localAddress?.map((data, i) => {
                  return (
                    <div title="Your Last Address">
                      <input
                        type="checkbox"
                        onChange={(e) => handleLocalAddress(e, i)}
                      />
                      <span
                        style={{
                          marginLeft: ".5vw",
                        }}
                      >
                        {" "}
                        {data?.first}
                      </span>
                      <p
                        style={{
                          marginLeft: "1.8vw",
                        }}
                      >
                        {" "}
                        {data?.address} - {data?.zip}
                      </p>
                    </div>
                  );
                })}
            </div>
          )}
        </div>
        <form className="row g-3 my-3">
          <div className="col-md-6">
            <label htmlFor="First" className="form-label">
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
            <label htmlFor="Last" className="form-label">
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

          <div className="col-12">
            <label htmlFor="LandMark" className="form-label">
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

          <div className="col-12">
            <label htmlFor="Address" className="form-label">
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

          <div className="col-md-6">
            <label htmlFor="inputCity" className="form-label">
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
            <label htmlFor="State" className="form-label">
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

          <div className="col-md-2">
            <label htmlFor="Zip" className="form-label">
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
            <label htmlFor="Mobile" className="form-label">
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
              Payment
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CheckOut;
