import { useNavigate, useParams } from "react-router";
import myContext from "../../context/myContext";
import { useContext, useEffect, useState } from "react";
import { Timestamp, doc, getDoc, setDoc } from "firebase/firestore";
import { fireDB } from "../../firebase/FirebaseConfig";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import "./UpdateProductPage.css";

const categoryList = [
    {
        name: 'Lock'
    },
    {
        name: 'Scissors'
    },
    {
        name: 'Nail clipper'
    },
    {
        name: 'Cycle ropes'
    },
    {
        name: 'Gas lighter'
    },
    {
        name: 'Peeler'
    },
    {
        name: 'Knife'
    },
    {
        name: 'Tongue cleaner'
    },
    {
        name: 'Toys'
    },
    {
        name: 'Key chain'
    },
    {
        name: 'others'
    }
];
const UpdateProductPage = () => {
    const context = useContext(myContext);
    const { loading, setLoading, getAllProductFunction } = context;

    // navigate 
    const navigate = useNavigate();
    const { id } = useParams()
    console.log(id)

    // product state
    const [product, setProduct] = useState({
        title: "",
        price: "",
        productImageUrl: "",
        category: "",
        description: "",
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

    // Get Single Product Function
    const getSingleProductFunction = async () => {
        setLoading(true);
        try {
            const productTemp = await getDoc(doc(fireDB, "products", id))
            //   console.log(product.data())
            const product = productTemp.data();
            setProduct({
                title: product?.title,
                price: product?.price,
                productImageUrl: product?.productImageUrl,
                category: product?.category,
                description: product?.description,
                quantity : product?.quantity,
                time: product?.time,
                date: product?.date
            })
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const updateProduct = async () => {
        setLoading(true)
        try {

            await setDoc(doc(fireDB, 'products', id), product)
            toast.success("Product Updated successfully")
            getAllProductFunction();
            setLoading(false)
            navigate('/admin-dashboard')

        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        getSingleProductFunction();
    }, []);

        return (
        <div className="update-container">
            {loading && <Loader />}
            <div className="update-form">
                <h2 className="form-title">Update Product</h2>

                <input
                    type="text"
                    name="title"
                    value={product.title}
                    onChange={(e) => setProduct({ ...product, title: e.target.value })}
                    placeholder="Product Title"
                    className="form-input"
                />

                <input
                    type="number"
                    name="price"
                    value={product.price}
                    onChange={(e) => setProduct({ ...product, price: e.target.value })}
                    placeholder="Product Price"
                    className="form-input"
                />

                <input
                    type="text"
                    name="productImageUrl"
                    value={product.productImageUrl}
                    onChange={(e) => setProduct({ ...product, productImageUrl: e.target.value })}
                    placeholder="Product Image URL"
                    className="form-input"
                />

                <select
                    value={product.category}
                    onChange={(e) => setProduct({ ...product, category: e.target.value })}
                    className="form-select"
                >
                    <option disabled>Select Product Category</option>
                    {categoryList.map((value, index) => (
                        <option key={index} value={value.name}>
                            {value.name}
                        </option>
                    ))}
                </select>

                <textarea
                    name="description"
                    placeholder="Product Description"
                    rows="5"
                    value={product.description}
                    onChange={(e) => setProduct({ ...product, description: e.target.value })}
                    className="form-textarea"
                ></textarea>

                <button onClick={updateProduct} className="form-button">
                    Update Product
                </button>
            </div>
        </div>
    );
};

export default UpdateProductPage;
