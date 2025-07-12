import { useState } from "react";
import "./BuyNowModal.css";

const BuyNowModal = ({ addressInfo, setAddressInfo, buyNowFunction  }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(!open);

    return (
        <>
            <button type="button" className="buy-now-button" onClick={handleOpen}>
                Buy now
            </button>

            {open && (
                <div className="dialog-overlay">
                    <div className="dialog-box">
                        <div className="dialog-body">
                            <div className="input-group">
                                <input
                                    type="text"
                                    name="name"
                                    value={addressInfo.name}
                                    onChange={(e) => setAddressInfo({ ...addressInfo, name: e.target.value })}
                                    placeholder="Enter your name"
                                    className="input-field"
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="text"
                                    name="address"
                                    value={addressInfo.address}
                                    onChange={(e) => setAddressInfo({ ...addressInfo, address: e.target.value })}
                                    placeholder="Enter your address"
                                    className="input-field"
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="number"
                                    name="pincode"
                                    value={addressInfo.pincode}
                                    onChange={(e) => setAddressInfo({ ...addressInfo, pincode: e.target.value })}
                                    placeholder="Enter your pincode"
                                    className="input-field"
                                />
                            </div>
                            <div className="input-group">
                                <input
                                    type="text"
                                    name="mobileNumber"
                                    value={addressInfo.mobileNumber}
                                    onChange={(e) => setAddressInfo({ ...addressInfo, mobileNumber: e.target.value })}
                                    placeholder="Enter your mobile number"
                                    className="input-field"
                                />
                            </div>

                            <button type="button" className="submit-button" onClick={() => { handleOpen(); buyNowFunction(); }}>
                                Buy now
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default BuyNowModal;
