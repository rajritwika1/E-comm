import { useNavigate } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext , useEffect } from "react";
import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import "./AllProduct.css";


const AllProduct = () => {
    const user = JSON.parse(localStorage.getItem('users'));

    const navigate = useNavigate();

    const context = useContext(myContext);
    const {getAllProduct } = context;

    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const addCart = (item) => {
        dispatch(addToCart(item));
        toast.success('Add to cart');
    }
    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.error('Deleted cart');
    }
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <Layout>
            <div className="allproduct-container">
                <h1 className="allproduct-heading">All Products</h1>
                <section className="product-grid">
                
                    {getAllProduct.map((item, index) => {
                        const{id, title, price, productImageUrl} = item;
                        return (
                        <div key={index} className="product-card">
                            <img
                                src={productImageUrl}
                                alt="blog"
                                onClick={() => navigate(`/productinfo/${id}`)}
                                className="product-image"
                            />
                            <div className="product-info">
                                <h2 className="product-brand">KanakSagar Traders</h2>
                                <h1 className="product-title">{title.substring(0, 25)}</h1>
                                {user && <h1 className="product-price">₹{price}</h1>}
                              <div className="btn-wrapper">
                                {cartItems?.some((p) => p.id === item.id) ? (
                                <button className="add-to-cart" onClick={() => deleteCart(item)}>Delete From Cart</button>
                                ) : (
                                <button className="add-to-cart" onClick={() => addCart(item)}>Add To Cart</button>
                                )}
                            </div>
                        </div>
                        </div>
                     )
                    })}
                </section>
            </div>
        </Layout>
    );
};

export default AllProduct;
