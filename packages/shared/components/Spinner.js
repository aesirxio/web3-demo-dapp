import React from "react";

function Spiner(size) {
  return (
    <div className="text-center">
      <div
        className="spinner-border"
        style={{ width: size ?? "3rem", height: size ?? "3rem" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Spiner;
