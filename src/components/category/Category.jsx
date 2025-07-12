import { useNavigate } from "react-router";
import "./Category.css";

const category = [
  { name: "Lock", image: "images/lock.jpg" },
  { name: "Scissors", image: "images/scissors.jpg" },
  { name: "Nail Clipper", image: "images/nail-clipper.jpg" },
  { name: "Cycle Ropes", image: "images/cycle-ropes.jpg" },
  { name: "Gas Lighter", image: "images/gas-lighter.jpg" },
  { name: "Peeler", image: "images/peeler.jpg" },
  { name: "Knife", image: "images/knife.jpg" },
  { name: "Tongue Cleaner", image: "images/tongue-cleaner.jpg" },
  { name: "Toys", image: "images/toys.jpg" },
  { name: "Key Chain", image: "images/key-chain.jpg" },
  { name: "Others", image: "images/others.jpg" },
];

const Category = () => {
  const navigate = useNavigate();

  return (
    <div className="category-wrapper">
      <div className="category-scroll">
        {category.map((item, index) => (
          <div
            key={index}
            className="category-card"
            onClick={() => navigate(`/category/${item.name}`)}
          >
            <div className="category-icon">
              <img src={item.image} alt={item.name} />
            </div>
            <div className="category-name">{item.name}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Category;
