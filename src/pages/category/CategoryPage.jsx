import { useNavigate, useParams } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect } from "react";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import './CategoryPage.css';

const CategoryPage = () => {
    const { categoryname } = useParams();
    const context = useContext(myContext);
    const { getAllProduct, loading } = context;
    
    const navigate = useNavigate();

    const filterProduct = getAllProduct.filter((obj) => obj.category.includes(categoryname));

    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const addCart = (item) => {
        // console.log(item)
        dispatch(addToCart(item));
        toast.success("Add to cart")
    }

    const deleteCart = (item) => {
        dispatch(deleteFromCart(item));
        toast.success("Delete cart")
    }

    // console.log(cartItems)

    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems])

    return (
        <Layout>
            <div className="category-page">
                <h1 className="category-title">{categoryname}</h1>

                {loading ? 
                    <div className="loader-container">
                        <Loader />
                    </div>
                 : 
                    <section className="product-section">
                        <div className="product-container">
                            <div className="product-grid">
                                {filterProduct.length > 0 ? 
                                    filterProduct.map((item, index) => {
                                        const { id, title, price, productImageUrl } = item;
                                        return (
                                            <div key={index} className="product-card">
                                                <div className="product-card-inner">
                                                    <img
                                                        onClick={() => navigate(`/productinfo/${id}`)}
                                                        className="product-image"
                                                        src={productImageUrl}
                                                        alt="img"
                                                    />
                                                    <div className="product-details">
                                                        <h2 className="product-brand">KanakSagar Traders</h2>
                                                        <h1 className="product-title">
                                                            {title.substring(0, 25)}
                                                        </h1>
                                                        <h1 className="product-price">₹{price}</h1>
                                                        <div className="btn-wrapper">
                                                            {cartItems.some((p) => p.id === item.id) ? (
                                                                <button className="product-btn" onClick={() => deleteCart(item)}>Delete From Cart</button>
                                                            ) : (
                                                                <button className="product-btn" onClick={() => addCart(item)}>Add To Cart</button>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                 : 
                                    <div className="no-product">
                                        <img
                                            className="no-product-img"
                                            src="https://cdn-icons-png.flaticon.com/128/2748/2748614.png"
                                            alt="not found"
                                        />
                                        <h1 className="no-product-text">No {categoryname} product found</h1>
                                    </div>
                                }
                            </div>
                        </div>
                    </section>
                }
            </div>
        </Layout>
    );
};

export default CategoryPage;
