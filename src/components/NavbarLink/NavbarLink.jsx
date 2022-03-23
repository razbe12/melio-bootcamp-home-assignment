import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./NavbarLink.css";

export const NavbarLink = (props) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isActive = pathname === props.to;
  const handleClick = () => {
    navigate(props.to);
  };

  return (
    <div className={`navbar-item ${isActive ? "active" : ""}`} onClick={handleClick}>
      {props.label}
    </div>
  );
};
