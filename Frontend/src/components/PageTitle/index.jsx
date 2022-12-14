import React from "react";
import "./index.css";

const PageTitle = ({ text, icon }) => {
  return (
    <h1 className="pageTitleComponent">
      {text} <img src={icon} alt={text} height={48} />
    </h1>
  );
};

export default PageTitle;
