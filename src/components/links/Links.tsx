import React from "react";
import { NavLink } from "react-router-dom";

const NavbarLinks = () => {
    return (
        <ul className="navbar-links">
            <li>
                <NavLink
                    to="/eshop"
                    className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                    E-shop
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/shops"
                    className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                    Pobočky
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/menu"
                    className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                    Menu
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/news"
                    className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                    Aktuality
                </NavLink>
            </li>
            <li>
                <NavLink
                    to="/booking"
                    className={({ isActive }) => (isActive ? "active-link" : "")}
                >
                    Rezervace
                </NavLink>
            </li>
        </ul>
    );
};

export default NavbarLinks;
