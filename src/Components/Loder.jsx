import React from "react";

const Loder = () => {
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "35vw",

          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    </>
  );
};

export default Loder;
