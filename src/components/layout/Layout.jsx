import Navbar from "../navbar/navbar";
import Footer from "../footer/footer";

const Layout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <div className="main-content">
                {children}
            </div>
            <Footer/>
        </div>
    );
}
export default Layout;