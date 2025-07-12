/* Login.jsx */
import {useContext, useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import myContext from "../../context/myContext";
import toast from "react-hot-toast";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth , fireDB } from "../../firebase/FirebaseConfig";
import Loader from "../../components/loader/Loader";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import "./AuthForm.css";

const Login = () => {
        const context = useContext(myContext);
    const { loading, setLoading } = context;

    // navigate 
    const navigate = useNavigate();

    // User Signup State 
    const [userLogin, setUserLogin] = useState({
        email: "",
        password: ""
    });

        const userLoginFunction = async () => {
        // validation 
        if (userLogin.email === "" || userLogin.password === "") {
            toast.error("All Fields are required")
        }

        setLoading(true);
        try {
            const users = await signInWithEmailAndPassword(auth, userLogin.email, userLogin.password);
            // console.log(users.user)

            try {
                const q = query(
                    collection(fireDB, "user"),
                    where('uid', '==', users?.user?.uid)
                );
                const data = onSnapshot(q, (QuerySnapshot) => {
                    let user;
                    QuerySnapshot.forEach((doc) => user = doc.data());
                    localStorage.setItem("users", JSON.stringify(user) )
                    setUserLogin({
                        email: "",
                        password: ""
                    })
                    toast.success("Login Successfully");
                    setLoading(false);
                    if(user.role === "user") {
                        navigate('/user-dashboard');
                    }else{
                        navigate('/admin-dashboard');
                    }
                });
                return () => data;
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error("Login Failed");
        }
    }

    return (
        <div className="auth-container">
            {loading && <Loader />}
            <div className="auth-form">
                <h2 className="auth-title">Login</h2>

                <input type="email" placeholder="Email Address" className="auth-input" value={userLogin.email} onChange={(e) => setUserLogin({ ...userLogin, email: e.target.value })} />
                <input type="password" placeholder="Password" className="auth-input" value={userLogin.password} onChange={(e) => setUserLogin({ ...userLogin, password: e.target.value })} />

                <button className="auth-button" onClick={userLoginFunction}>Login</button>

                <p className="auth-switch">
                    Don&apos;t have an account? <Link to="/signup" className="auth-link">Signup</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
