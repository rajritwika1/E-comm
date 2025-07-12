import { useContext } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import "./UserDashboard.css";

const UserDashboard = () => {
    const user = JSON.parse(localStorage.getItem('users'));
    const context = useContext(myContext);
    const { loading, getAllOrder } = context;

    return (
        <Layout>
            <div className="user-dashboard-container">
                {/* Top User Info */}
                <div className="user-info-card">
                    <div className="user-image-wrapper">
                        <img src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png" alt="user" />
                    </div>
                    <div className="user-info-text">
                        <h1><strong>Name:</strong> {user?.name}</h1>
                        <h1><strong>Email:</strong> {user?.email}</h1>
                        <h1><strong>Date:</strong> {user?.date}</h1>
                        <h1><strong>Role:</strong> {user?.role}</h1>
                    </div>
                </div>

                {/* Order Details */}
                <div className="order-section">
                    <h2>Order Details</h2>

                    <div className="loader-wrapper">
                        {loading && <Loader />}
                    </div>

                    {getAllOrder.filter((obj) => obj.userid === user?.uid).map((order, index) => (
                        <div key={index}>
                            {order.cartItems.map((item, i) => {
                                const { id, date, quantity, price, title, productImageUrl, category } = item;
                                const { status } = order;

                                return (
                                    <div key={i} className="order-card">
                                        {/* Left */}
                                        <div className="order-left">
                                            <div className="order-info-grid">
                                                <div>
                                                    <div className="order-label">Order Id</div>
                                                    <div>#{id}</div>
                                                </div>
                                                <div>
                                                    <div className="order-label">Date</div>
                                                    <div>{date}</div>
                                                </div>
                                                <div>
                                                    <div className="order-label">Total Amount</div>
                                                    <div>₹ {price * quantity}</div>
                                                </div>
                                                <div>
                                                    <div className="order-label">Order Status</div>
                                                    <div className="order-status">{status}</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Right */}
                                        <div className="order-right">
                                            <ul className="product-list">
                                                <li className="product-item">
                                                    <div className="product-info">
                                                        <img src={productImageUrl} alt="product" className="product-image" />
                                                        <div className="product-text">
                                                            <p className="product-title">{title}</p>
                                                            <p className="product-category">{category}</p>
                                                            <p className="product-quantity">x {quantity}</p>
                                                        </div>
                                                    </div>
                                                    <div className="product-price">₹ {price}</div>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}
                </div>
            </div>
        </Layout>
    );
};

export default UserDashboard;
