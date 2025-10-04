import React, {useState, useEffect} from "react";
import "./Navbar.css";
import MyFeinlogo from "../../assets/MyFeinlogo.png";
import SearchIcon from "@mui/icons-material/Search";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; // Import logout icon
import {useNavigate, Link} from "react-router-dom";
import {useCart} from "../../context/Cart"; // Custom hook for cart management
import Links from "../links"

const Navbar: React.FC = () => {
    const [userFirstName, setUserFirstName] = useState<string | null>(null);
    const navigate = useNavigate();
    const {cart} = useCart(); // Get cart state from context

    useEffect(() => {
        // Check if firstName is stored in sessionStorage
        const storedFirstName = sessionStorage.getItem("userFirstName");
        if (storedFirstName) {
            setUserFirstName(storedFirstName);
        }
    }, []);

    const handleUserIconClick = () => {
        navigate("/login"); // Redirect to the SignIn page
    };

    const handleLogout = () => {
        sessionStorage.removeItem("userFirstName"); // Remove user data from session storage
        sessionStorage.clear(); // Clear all items from session storage
        setUserFirstName(null); // Clear user name from state
        navigate("/login"); // Redirect to the login page
    };

    const handleLoginRedirect = () => {
        navigate("/login"); // Redirect to login page
    };

    const handleLogoClick = () => {
        navigate("/");
    };

    const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0); // Calculate total cart items

    return (
        <nav className="navbar">
            {/* Logo */}
            <div
                className="navbar-logo"
                onClick={handleLogoClick}
                style={{cursor: "pointer"}}
            >
                <img src={MyFeinlogo} alt="MyFein Logo"/>
            </div>

            <Links/>

            {/* Icons */}
            <div className="navbar-icons">
                {/* User section */}
                {userFirstName ? (
                    <>
                        <span className="user-name">{`Vítej, ${userFirstName}!`}</span>
                        <button
                            className="icon-button"
                            aria-label="Logout"
                            onClick={handleLogout}
                        >
                            <ExitToAppIcon className="icon"/>
                        </button>
                    </>
                ) : (
                    <button
                        className="login-button"
                        aria-label="Log in"
                        onClick={handleLoginRedirect}
                    >
                        Přihlásit se
                    </button>
                )}

                {/* Cart Icon */}
                <button
                    className="cart-button"
                    aria-label="Cart"
                    onClick={() => navigate("/cart")} // Navigate to /cart on click
                >
                    <ShoppingCartIcon className="icon"/>
                    <span className="cart-count">{cartItemCount}</span>
                </button>
            </div>
        </nav>
    );
};

export default Navbar;
