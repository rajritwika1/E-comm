import { useContext } from "react";
import myContext from "../../context/myContext";
import './UserDetail.css';

const UserDetail = () => {
    
    const context = useContext(myContext);
    const { getAllUser } = context;


    return (
        <div className="user-detail">
            {/* Header */}
            <div className="user-header">
                <h1 className="user-title">All User</h1>
            </div>

            {/* Table */}
            <div className="table-wrapper">
<table className="user-table">
  <thead >
    <tr>
      <th>S.No</th>
      <th>Name</th>
      <th>Email</th>
      <th>Uid</th>
      <th>Role</th>
      <th>Date</th>
    </tr>
  </thead>
  <tbody>
    {getAllUser.map((value, index) => (
      <tr key={index}>
        <td>{index + 1}</td>
        <td>{value.name}</td>
        <td>{value.email}</td>
        <td>{value.uid}</td>
        <td>{value.role}</td>
        <td>{value.date}</td>
      </tr>
    ))}
  </tbody>
</table>


            </div>
        </div>
    );
};

export default UserDetail;
