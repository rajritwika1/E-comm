import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import { useSelector } from "react-redux";
import './Navbar.css'; // 👈 import your new style file

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem('users'));

    const navigate = useNavigate();

        const logout = () => {
        localStorage.clear('users');
        navigate("/login")
    }
    const cartItems = useSelector((state) => state.cart);


    const navList = (
        <ul className="nav-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/allproduct">All Product</Link></li>
            {!user ?  <li><Link to="/signup">Signup</Link></li> : ""}
            {!user ?  <li><Link to="/login">Login</Link></li> : ""}
            { user?.role === "user" && <li><Link to="/user-dashboard">User</Link></li> }
            { user?.role === "admin" && <li><Link to="/admin-dashboard">Admin</Link></li> }
            { user && <li onClick={logout} className="logout">Logout</li> }
            {/* Cart Link */}
            <li><Link to="/cart">Cart({cartItems?.length})</Link></li>
        </ul>
    );

    return (
        <nav className="navbar">
            <div className="nav-container">
                {/* Left */}
                <div className="nav-left">
                    <Link to="/" className="brand-link">
                        <h2>KanakSagar Traders</h2>
                    </Link>
                </div>

                {/* Right */}
                <div className="nav-right">
                    {navList}
                </div>

                {/* Search */}
                <SearchBar />
            </div>
        </nav>
    );
};

export default Navbar;
