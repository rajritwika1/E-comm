import MyContext from "../../context/myContext";
import Category from "../../components/category/Category";
import HeroSection from "../../components/heroSection/HeroSection";
import HomePageProductCard from "../../components/homePageProductCard/HomePageProductCard";
import Track from "../../components/track/Track";
import Testimonial from "../../components/testimonial/Testimonial";
import Layout from "../../components/layout/Layout";
import Loader  from "../../components/loader/Loader";

const HomePage = () => {
;
  return (
   <Layout>
     <HeroSection />
     <Category />
     <HomePageProductCard />
     <Track/>
     <Testimonial />
     <Loader/>
   </Layout>
  );
}

export default HomePage;
