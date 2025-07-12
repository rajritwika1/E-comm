import { useContext } from "react";
import myContext from "../../context/myContext";
import './OrderDetail.css';

const OrderDetail = () => {
    const context = useContext(myContext);
    const { getAllOrder, deleteProduct } = context;

    return (
        <div className="order-detail">
            {/* Header */}
            <div className="order-header">
                <h1 className="order-title">All Order</h1>
            </div>

            {/* Table */}
            <div className="table-wrapper">
                <table className="order-table">
                    <thead>
                        <tr>
                            <th>S.No.</th>
                            <th>Order Id</th>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                            <th>Status</th>
                            <th>Name</th>
                            <th>Address</th>
                            <th>Pincode</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                          {getAllOrder.map((order) => {
                            console.log(order)
                            return (
                              <>
                                {order.cartItems.map((item, index) => {
                                  const { id, productImageUrl, title, category, price, quantity } = item;
                                  return (
                                    <tr key={id} className="order-row">
                                        <td>{index + 1}</td>
                                        <td>{id}</td>
                                        <td><img src={productImageUrl} alt="img" /></td>
                                        <td>{title}</td>
                                        <td>{category}</td>
                                        <td>₹ {price}</td>
                                        <td>{quantity}</td>
                                        <td>₹ {price * quantity}</td>
                                        <td>{order.status}</td>
                                        <td>{order.addressInfo.name}</td>
                                        <td>{order.addressInfo.address}</td>
                                        <td>{order.addressInfo.pincode}</td>
                                        <td>{order.addressInfo.mobileNumber}</td>
                                        <td>{order.email}</td>
                                        <td>{order.date}</td>
                                        <td style={{ cursor: 'pointer', color: "red", fontWeight: "600" }} onClick={() => deleteProduct(order.id)}>Delete</td>
                                    </tr>
                                  );
                                })}
                              </>
                            );
                          })}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default OrderDetail;
