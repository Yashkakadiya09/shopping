import React, { useState } from "react";

const Admin = () => {
  const [addressObj, setAddressObj] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
  });
  const handleObj = (e) => {
    let { name, value } = e.target;
    setAddressObj({
      ...addressObj,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await fetch("https://api.escuelajs.co/api/v1/products/", {
      method: "POST",
      body: JSON.stringify({
        title: "Classic Heather Gray Hoodie",
        price: 99999,
        description:
          "adjustable drawstring hood, and ribbed cuffs. Perfect for a casual day out or a relaxing evening in, this hoodie is a versatile addition to any wardrobe.",
        image: ["https://i.imgur.com/CFOjAgK.jpeg"],
        categoryId: 1,
      }),
    })
      .then((res) => res.json())
      .then((json) => console.log(json));
  };
  return (
    <div>
      <div style={{ margin: "5vw", border: "1px solid black", padding: "2vw" }}>
        <div class="card-header py-2">
          <h5 class="mb-0 text-font text-uppercase">Add Product</h5>
        </div>
        <form class="row g-3 my-3">
          <div class="col-md-6">
            <label for="First" class="form-label">
              Product Name
            </label>
            <input
              type="text"
              class="form-control"
              id="First"
              name="title"
              onChange={(e) => handleObj(e)}
              placeholder="Enter Product Name"
            />
          </div>

          <div class="col-12">
            <label for="LandMark" class="form-label">
              Price
            </label>
            <input
              type="text"
              class="form-control"
              id="LandMark"
              name="price"
              placeholder="Enter price"
              onChange={(e) => handleObj(e)}
            />
          </div>

          <div class="col-12">
            <label for="Address" class="form-label">
              description{" "}
            </label>
            <input
              type="text"
              class="form-control"
              id="Address"
              name="description"
              placeholder="Enter  description"
              onChange={(e) => handleObj(e)}
            />
          </div>

          <div class="col-md-6">
            <label for="inputCity" class="form-label">
              image
            </label>
            <input
              type="text"
              class="form-control"
              id="inputCity"
              placeholder="Enter image"
              name="image"
              onChange={(e) => handleObj(e)}
            />
          </div>

          <div class="col-md-4">
            <label for="State" class="form-label">
              category
            </label>
            <input
              type="text"
              class="form-control"
              id="State"
              placeholder="Enter category Name"
              name="category"
              onChange={(e) => handleObj(e)}
            />
          </div>

          <div class="col-12">
            <button
              type="submit"
              class="btn btn-primary"
              onClick={(e) => handleSubmit(e)}
            >
              submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Admin;
