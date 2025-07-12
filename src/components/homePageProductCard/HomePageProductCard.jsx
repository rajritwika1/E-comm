// productData 
import './HomePageProductCard.css'
import { useNavigate } from "react-router";
import { useContext, useEffect } from "react";
import myContext from "../../context/myContext";
import {useDispatch, useSelector} from "react-redux";
import toast from 'react-hot-toast';
import { addToCart, deleteFromCart } from '../../redux/cartSlice';
import Loader from "../../components/loader/Loader";

const HomePageProductCard = () => {
  const user = JSON.parse(localStorage.getItem('users'));

     const navigate = useNavigate();

    const context = useContext(myContext);
    const {loading,getAllProduct} = context;

    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    const  addCart = (item) => {
      dispatch(addToCart(item));
      toast.success('Added to cart');
    }
    const deleteCart = (item) => {
      dispatch(deleteFromCart(item));
      toast.error('Deleted cart');
    }
    useEffect(() => {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    return (
    <div className="bestsellers">
      {/* Heading */}
      <div>
        <h1 className="heading">Bestselling Products</h1>
      </div>

      {/* Main section */}
      <section className="bestsellers-section">
        <div className="bestsellers-container">
          {loading && (<Loader />)}  
          <div className="bestsellers-grid">
            {getAllProduct.slice(0,8).map((item, index) => {
              const { id, title, price, productImageUrl } = item;
              return (
                <div key={index} className="bestsellers-card-wrapper">
                  <div className="bestsellers-card">
                    <img 
                    onClick={() => navigate(`/productinfo/${id}`)}
                    src={productImageUrl} alt="img" />
                    <div className="bestsellers-content">
                      <h2 className="bestsellers-subtitle">KanakSagar Traders</h2>
                      <h1 className="bestsellers-title">
                        {title.substring(0, 25)}
                      </h1>
                    { user && <h1 className="bestsellers-price">₹{price}</h1>}
                      <div className="flex justify-center">
                        {cartItems?.some((p) => p.id === item.id) ? (
                          <button 
                            onClick={() => deleteCart(item)}
                            className="bestsellers-button">
                            Delete From Cart
                          </button>
                        ) : (
                          <button 
                            onClick={() => addCart(item)}
                            className="bestsellers-button">
                            Add To Cart
                          </button>
                        )}
                        </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
    );
}

export default HomePageProductCard;