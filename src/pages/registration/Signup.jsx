/* Signup.jsx */
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import { auth, fireDB } from "../../firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import toast from "react-hot-toast";
import Loader from "../../components/loader/Loader";
import './AuthForm.css';

const Signup = () => {

    const context = useContext(myContext);
    const {loading, setLoading } = context;

    // navigate 
 

    const navigate = useNavigate();

    // User Signup State 
    const [userSignup, setUserSignup] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
        phone: "",
        role: "user"
    });

    const userSignupFunction = async () => {
        // validation 
if (
    userSignup.name.trim() === "" ||
    userSignup.email.trim() === "" ||
    userSignup.password.trim() === "" ||
    userSignup.confirmPassword.trim() === "" ||
    userSignup.phone.trim() === ""
) {
    toast.error("All fields are required");
    return;
}

if (userSignup.password !== userSignup.confirmPassword) {
    toast.error("Passwords do not match");
    return;
}
        if (userSignup.password.length < 6) {
            toast.error("Password must be at least 6 characters long");
            return;
        }   

        setLoading(true);
        try {
            const users = await createUserWithEmailAndPassword(auth, userSignup.email, userSignup.password);

            // create user object
            const user = {
                name: userSignup.name,
                email: users.user.email,
                phone: userSignup.phone,
                uid: users.user.uid,
                role: userSignup.role,
                time: Timestamp.now(),
                date: new Date().toLocaleString(
                    "en-US",
                    {
                        month: "short",
                        day: "2-digit",
                        year: "numeric",
                    }
                )
            }


            const userRefrence = collection(fireDB, "user")

            addDoc(userRefrence, user);

            setUserSignup({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                phone: ""
            })

            toast.success("Signup Successfully");

            setLoading(false);
            navigate('/login')
        } catch (error) {
            console.log(error);
            setLoading(false);
        }

    }


    return (
        <div className="auth-container">
            {loading && <Loader />}
            <div className="auth-form">
                <h2 className="auth-title">Signup</h2>

                <input type="text" placeholder="Full Name" className="auth-input"   value={userSignup.name}
  onChange={(e) => setUserSignup({ ...userSignup, name: e.target.value })}
/>
                <input type="email" placeholder="Email Address" className="auth-input"   value={userSignup.email}
  onChange={(e) => setUserSignup({ ...userSignup, email: e.target.value })}
/>
                <input type="password" placeholder="Password" className="auth-input"   value={userSignup.password}
  onChange={(e) => setUserSignup({ ...userSignup, password: e.target.value })}
/>
                <input type="password" placeholder="Confirm Password" className="auth-input"   value={userSignup.confirmPassword}
  onChange={(e) => setUserSignup({ ...userSignup, confirmPassword: e.target.value })}
/>
                <input type="tel" pattern="[0-9]{10}" maxLength={10} placeholder="Phone Number" className="auth-input" value={userSignup.phone}
  onChange={(e) => setUserSignup({ ...userSignup, phone: e.target.value })}
/>

                <button className="auth-button" onClick={userSignupFunction} disabled={loading}>{loading ? "Loading..." : "Signup"}</button>

                <p className="auth-switch">
                    Have an account? <Link to="/login" className="auth-link">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Signup;
