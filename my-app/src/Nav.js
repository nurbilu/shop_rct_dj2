import React from 'react'
import {Link , Outlet} from "react-router-dom";

const Nav = () => {
  return (
    <div><Link to="/"><h1>home</h1></Link>{" "}
    <Link to="/helolo"><h1>helolo</h1></Link>{" "}
    <Link to="/shop"><h1>shop</h1></Link>{" "}
        </div>
  )
}

export default Nav