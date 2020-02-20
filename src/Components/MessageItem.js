import React from "react";
export default ({ title, text, active , danger}) => {
  return (
    <div className="message-item container">
      <span className="col-1"><b>{title}</b></span>
      <span className={`col-4 text ${danger&&"danger"}`}>{text}</span>
      <span className="col-1">{active && <span className="active"></span>}</span>
    </div>
  );
};
