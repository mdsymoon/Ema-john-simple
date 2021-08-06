import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/logo.png";
import "./Header.css";
import {useContext} from "react";

import { UserContext } from './../../App';



const Header = () => {
  const [loggedInUser, setloggedInUser] = useContext(UserContext);
  return (
    <div className="header">
      <img src={logo} alt="" />
      <nav >
      <Link to="/shop">shop</Link>
      <Link to="/review">Order Review</Link>
      <Link to="/inventory">Manage Inventory</Link>
      <button style={{backgroundColor:"black",color:"white",fontSize:"20px"}} onClick={() => setloggedInUser({})}>Sign Out</button>
      </nav>
    </div>
  );
};

export default Header;
