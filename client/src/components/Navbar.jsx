import React, {useContext}  from 'react';
import {AuthContext} from "../context/AuthContext";
import {NavLink} from "react-router-dom";


const Navbar = () => {

    const auth = useContext(AuthContext)
    const logout = (e)=>{
        e.preventDefault()
        auth.logout()
    }

    return (
        <nav>
            <div className="nav-wrapper">
                <a href="#" className="brand-logo">Logo</a>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    <li><NavLink to="/create" >Create</NavLink></li>
                    <li><NavLink to="/links" >Links</NavLink></li>
                    <li><NavLink onClick={logout} to='/'>Logout</NavLink></li>

                </ul>
            </div>
        </nav>
    );
};

export default Navbar;