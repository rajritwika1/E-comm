import { useContext, useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import { useParams } from "react-router";
import { fireDB } from "../../firebase/FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import Loader from "../../components/loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import './ProductInfo.css';

const ProductInfo = () => {
  const navigate = useNavigate();
  const context = useContext(myContext);
  const { loading, setLoading } = context;

  const [product, setProduct] = useState('');
  console.log(product);

  const { id } = useParams();
  console.log(product);

  const getProductData = async () => {
    setLoading(true);
    try {
      const productTemp = await getDoc(doc(fireDB, "products", id));
      setProduct({...productTemp.data(),id : productTemp.id});
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
    
  };
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
       useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

  useEffect(() => {
    getProductData();
  }, []);

  return (
    <Layout>
      <section className="product-section">
        {loading ? (
          <div className="loader-center"><Loader /></div>
        ) : (
          <div className="product-container">
            {/* Image */}
            <div className="product-left">
              <img src={product?.productImageUrl} alt="product" />
            </div>

            {/* Product Details */}
            <div className="product-right">
              <h2 className="product-title">{product?.title}</h2>
              <p className="product-price"><span>₹ {product?.price}</span></p>

              <div className="product-description">
                <h2>Description :</h2>
                <p>{product?.description}</p>
              </div>
               
               <div className="product-links">
               {cartItems.some((p) => p.id === product.id)
               ?
                <button className="add-to-cart-btn" onClick={() => deleteCart(product)}>Delete From Cart</button>
                :
                <button className="add-to-cart-btn" onClick={() => addCart(product)}>Add To Cart</button>
               }
            </div>
            <div>
             <button className="add-to-cart-btn"type="button" onClick={() => navigate("/cart")}>Buy Now</button>
            </div>
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
};

export default ProductInfo;
