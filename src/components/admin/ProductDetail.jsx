import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import Loader from "../loader/Loader";
import { deleteDoc, doc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import "./ProductDetail.css";

const ProductDetail = () => {
  const context = useContext(myContext);
  const { loading, setLoading, getAllProduct,getAllProductFunction  } = context;
  const navigate = useNavigate();
  
    const deleteProduct = async (id) => {
        setLoading(true)
        try {
            await deleteDoc(doc(fireDB, 'products', id))
            toast.success('Product Deleted successfully')
            getAllProductFunction();
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

  return (
    <div className="product-detail">
      <div className="product-detail-header">
        <h1 className="product-detail-title">All Product</h1>
        <Link to="/addproduct">
          <button className="add-product-btn">Add Product</button>
        </Link>
      </div>

      {loading && (
        <div className="loader-container">
          <Loader />
        </div>
      )}

      <div className="table-wrapper">
        <table className="product-table">
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Image</th>
              <th>Title</th>
              <th>Price</th>
              <th>Category</th>
              <th>Date</th>
              <th>Action</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {getAllProduct.map((item, index) => {
              const { id,title, price, category, date, productImageUrl } = item;
              return (
                <tr key={index}>
                  <td>{index + 1}.</td>
                  <td>
                    <div className="image-container">
                      <img src={productImageUrl} alt="" />
                    </div>
                  </td>
                  <td>{title}</td>
                  <td>₹{price}</td>
                  <td>{category}</td>
                  <td>{date}</td>
                  <td onClick={() => navigate(`/updateproduct/${id}`)}
                  className="edit-btn" style={{ cursor: "pointer", color:"green" }}>Edit</td>
                  <td onClick={() => deleteProduct(id)}
                  className="delete-btn" style={{ cursor: "pointer", color:"red" }}>Delete</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductDetail;
