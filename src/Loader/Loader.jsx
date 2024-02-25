import React, { useState } from "react";
import "./Loader.css";

const Loader = ({ loading }) => {
  return (
    <div
      className="loader-container"
      style={{ display: loading ? "flex" : "none" }}
    >
      <div className="loader"></div>
    </div>
  );
};

export default Loader;
