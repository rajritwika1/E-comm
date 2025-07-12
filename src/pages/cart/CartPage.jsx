import { useDispatch, useSelector } from "react-redux";
import Layout from "../../components/layout/Layout";
import { Trash } from 'lucide-react';
import { decrementQuantity, deleteFromCart, incrementQuantity } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import BuyNowModal from "../../components/buyNowModal/BuyNowModal";
import { Navigate } from "react-router";
import "./CartPage.css";

const CartPage = () => {
    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Item removed from cart");
    };

    const handleIncrement = (id) => {
        dispatch(incrementQuantity(id));
    };

    const handleDecrement = (id) => {
        dispatch(decrementQuantity(id));
    };

    const cartItemTotal = cartItems.map(item => item.quantity).reduce((preValue, currValue) => preValue + currValue, 0);
    const cartTotal = cartItems.map(item => item.price * item.quantity).reduce((preValue, currValue) => preValue + currValue, 0);

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);
    
    const user = JSON.parse(localStorage.getItem('users'));

        const [addressInfo, setAddressInfo] = useState({
        name: "",
        address: "",
        pincode: "",
        mobileNumber: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString(
            "en-US",
            {
                month: "short",
                day: "2-digit",
                year: "numeric",
            }
        )
    });

        const buyNowFunction = () => {
        // validation 
        if (addressInfo.name === "" || addressInfo.address === "" || addressInfo.pincode === "" || addressInfo.mobileNumber === "") {
            return toast.error("All Fields are required")
        };

           const orderInfo = {
            cartItems,
            addressInfo,
            email: user.email,
            userid: user.uid,
            status: "confirmed",
            time: Timestamp.now(),
            date: new Date().toLocaleString(
                "en-US",
                {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                }
            )
        }
        try {
            const orderRef = collection(fireDB, 'order');
            addDoc(orderRef, orderInfo);
            setAddressInfo({
                name: "",
                address: "",
                pincode: "",
                mobileNumber: "",
            })
            toast.success("Order Placed Successfull");
        } catch (error) {
            console.log(error);
        }

    };

    return (
        <Layout>
            <div className="cart-container">
                <div className="cart-wrapper">
                    <h1 className="cart-title">Shopping Cart</h1>
                    <form className="cart-form">
                        <section className="cart-items-section">
                            <h2 className="sr-only">Items in your shopping cart</h2>
                            <ul className="cart-item-list">
                                {cartItems.length > 0 ? (
                                    cartItems.map((item, index) => {
                                        const { id, title, price, productImageUrl, quantity, category } = item;
                                        return (
                                            <li key={index} className="cart-item">
                                                <img
                                                    src={productImageUrl}
                                                    alt={'image'}
                                                    className="cart-item-img"
                                                />
                                                <div className="cart-item-details">
                                                    <div className="cart-item-info">
                                                        <div className="cart-item-title"><h3>{title}</h3></div>
                                                        <div className="cart-item-category"><p>{category}</p></div>
                                                        <div className="cart-item-price"><p>₹ {price}</p></div>
                                                    </div>
                                                    <div className="cart-item-controls">
                                                        <div className="quantity-control">
                                                            <button onClick={() => handleDecrement(id)} type="button">-</button>
                                                            <input type="text" value={quantity} readOnly />
                                                            <button onClick={() => handleIncrement(id)} type="button">+</button>
                                                        </div>
                                                        <button onClick={() => deleteCart(item)} className="remove-btn" type="button">
                                                            <Trash size={12} className="trash-icon" />
                                                            <span>Remove</span>
                                                        </button>
                                                    </div>
                                                </div>
                                            </li>
                                        );
                                    })
                                ) : (
                                    <h3 className="empty-cart">No items in cart.</h3>
                                )}
                            </ul>
                        </section>

                        <section className="price-summary">
                            <h2 className="summary-heading">Price Details</h2>
                            <div className="summary-content">
                                <div className="summary-row">
                                    <span>Price ({cartItemTotal} item)</span>
                                    <span>₹ {cartTotal}</span>
                                </div>
                                <div className="summary-row">
                                    <span>Delivery Charges</span>
                                    <span className="free-text">Free</span>
                                </div>
                                <div className="summary-row total">
                                    <span>Total Amount</span>
                                    <span>₹ {cartTotal}</span>
                                </div>
                                <div className="buy-now">
                                  {user ? 
                                  <BuyNowModal
                                    addressInfo={addressInfo}
                                    setAddressInfo={setAddressInfo}
                                    buyNowFunction={buyNowFunction}
                                    />
                                  :
                                  <Navigate to="/login" />
                                  }
                                  </div>                 
                               </div>
                        </section>
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default CartPage;
