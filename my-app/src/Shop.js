import React from 'react'
import { Link, Outlet } from 'react-router-dom'

const Shop = () => {
    return (
        <div>Shop
            <br></br>
            <Link to="/shop/allCtas/1">toys</Link>{" "}
            <Link to="/shop/allCtas/2">clothes</Link>{" "}
            <Link to="/shop/allCtas/3">electronics</Link>{" "}
            <br></br>
            <Outlet></Outlet>
        </div>
    )
}

export default Shop