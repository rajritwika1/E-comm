import { Timestamp, addDoc, collection } from "firebase/firestore";
import { useContext, useState } from "react";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { fireDB } from "../../firebase/FirebaseConfig";
import { useNavigate } from "react-router";
import Loader from "../../components/loader/Loader";
import "./AddProductPage.css";

const categoryList = [
  { name: 'Lock' }, { name: 'Scissors' }, { name: 'Nail clipper' },
  { name: 'Cycle ropes' }, { name: 'Gas lighter' }, { name: 'Peeler' },
  { name: 'Knife' }, { name: 'Tongue cleaner' }, { name: 'Toys' },
  { name: 'Key chain' }, { name: 'others' }
];

const AddProductPage = () => {
    const context = useContext(myContext);
    const { loading, setLoading } = context;
    const navigate = useNavigate();

    const [product, setProduct] = useState({
        title: "",
        price: "",
        productImageUrl: "",
        category: "",
        description: "",
        quantity: "",
        time: Timestamp.now(),
        date: new Date().toLocaleString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
        }),
    });

    const addProductFunction = async () => {
        if (
            product.title === "" ||
            product.price === "" ||
            product.productImageUrl === "" ||
            product.category === "" ||
            product.description === "" ||
            product.quantity === ""
        ) {
            return toast.error("All fields are required");
        }

        setLoading(true);
        try {
            const productRef = collection(fireDB, "products");
            await addDoc(productRef, product);
            toast.success("Product added successfully");
            navigate("/admin-dashboard");
        } catch (error) {
            console.log(error);
            toast.error("Failed to add product");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="add-product-container">
            {loading && <Loader />}
            <div className="form-wrapper">
                <h2 className="form-title">Add Product</h2>
                <div className="form-group">
                    <input
                        type="text"
                        name="title"
                        value={product.title}
                        onChange={(e) =>
                            setProduct({ ...product, title: e.target.value })
                        }
                        placeholder="Product Title"
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={(e) =>
                            setProduct({ ...product, price: e.target.value })
                        }
                        placeholder="Product Price"
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        name="productImageUrl"
                        value={product.productImageUrl}
                        onChange={(e) =>
                            setProduct({ ...product, productImageUrl: e.target.value })
                        }
                        placeholder="Product Image URL"
                        className="form-input"
                    />
                </div>
                <div className="form-group">
                    <select
                        value={product.category}
                        onChange={(e) =>
                            setProduct({ ...product, category: e.target.value })
                        }
                        className="form-input"
                    >
                        <option value="">
                            Select Product Category
                        </option>
                        {categoryList.map((item, index) => (
                            <option key={index} value={item.name}>
                                {item.name.charAt(0).toUpperCase() + item.name.slice(1)}
                            </option>
                        ))}
                    </select>
                </div>
                 <input
                        type="number"
                        name="quantity"
                        value={product.quantity}
                        onChange={(e) =>
                            setProduct({ ...product, quantity: e.target.value })
                        }
                        placeholder="Product Quantity"
                        className="form-input"
                    />
                <div className="form-group">
                    <textarea
                        name="description"
                        rows="4"
                        value={product.description}
                        onChange={(e) =>
                            setProduct({ ...product, description: e.target.value })
                        }
                        placeholder="Product Description"
                        className="form-input"
                    ></textarea>
                </div>
                <div className="form-group">
                    <button onClick={addProductFunction} className="submit-button">
                        Add Product
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AddProductPage;
